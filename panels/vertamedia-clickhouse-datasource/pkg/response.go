package main

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
)

type FieldMeta struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type Response struct {
	Meta []*FieldMeta             `json:"meta"`
	Data []map[string]interface{} `json:"data"`
}

var complexTypeRE = regexp.MustCompile("Array|Tuple|Map")
var labelTypeRE = regexp.MustCompile("String|UUID|Enum|IPv4|IPv6")
var seriesFromMacrosRE = regexp.MustCompile(`Array\(Tuple\(([^,]+), ([^)]+)\)\)`)

func (r *Response) toFrames(query *Query, fetchTZ FetchTZFunc) (data.Frames, error) {

	labelFieldsMap, hasLabelFields := r.prepareLabelFieldsMap()
	timeStampFieldIdx, hasTimeStamp := r.getTimestampFieldIdx()

	if hasTimeStamp {
		return r.toFramesWithTimeStamp(query, fetchTZ, hasLabelFields, labelFieldsMap, timeStampFieldIdx)
	} else {
		return r.toFramesTable(query, fetchTZ)
	}

}

func (r *Response) prepareLabelFieldsMap() (map[string]int, bool) {
	labelTypesMap := map[string]int{}
	for idx, field := range r.Meta {
		if r.isLabelType(field.Type) {
			labelTypesMap[field.Name] = idx
		}
	}
	return labelTypesMap, len(labelTypesMap) > 0
}

func (r *Response) isLabelType(fieldType string) bool {
	return labelTypeRE.MatchString(fieldType) && !complexTypeRE.MatchString(fieldType)
}

// getTimestampFieldIdx found first field in Meta which contains timestamp for timeseries data
func (r *Response) getTimestampFieldIdx() (int, bool) {
	for idx, field := range r.Meta {
		if strings.HasPrefix(field.Type, "DateTime") || (field.Name == "t" && strings.Contains(field.Type, "Int")) {
			return idx, true
		}
	}
	return -1, false

}

func (r *Response) toFramesWithTimeStamp(query *Query, fetchTZ FetchTZFunc, hasLabelFields bool, labelFieldsMap map[string]int, timeStampFieldIdx int) (data.Frames, error) {
	frames := data.Frames{}
	framesMap := map[string]*data.Frame{}

	timestampFieldName := r.Meta[timeStampFieldIdx].Name
	timestampFieldType := r.Meta[timeStampFieldIdx].Type

	timeZonesMap, metaTypes := r.analyzeResponseMeta(fetchTZ)
	// 1 value field + 1 timestamp field
	hasMultipleTimeSeries := (len(r.Meta) - len(labelFieldsMap)) > 2

	// frameName -> timeStampDataField
	timeStampDataFieldMap := map[string]*data.Field{}
	// frameName -> valueDataFieldMap
	valueDataFieldMap := map[string]*data.Field{}

	for _, row := range r.Data {
		timestampValue := ParseValue(
			timestampFieldName, timestampFieldType, timeZonesMap[timestampFieldName], row[timestampFieldName], false,
		).(time.Time)

		if hasLabelFields {
			framePrefix := r.generateFrameNameByLabels(row, metaTypes, labelFieldsMap)
			for fieldName, fieldValue := range row {
				_, isLabel := labelFieldsMap[fieldName]
				if fieldName != timestampFieldName && !isLabel {
					frameName := framePrefix
					if hasMultipleTimeSeries {
						frameName += ", " + fieldName
					}
					r.createFrameIfNotExistsAndAddPoint(query, framesMap, frameName, timeStampDataFieldMap, timestampFieldName, valueDataFieldMap, fieldName, metaTypes[fieldName], timestampValue, timeZonesMap, fieldValue)
				}
			}
		} else {
			for fieldName, fieldValue := range row {
				if fieldName != timestampFieldName {
					if seriesFromMacrosRE.MatchString(metaTypes[fieldName]) {
						for _, match := range seriesFromMacrosRE.FindAllStringSubmatch(metaTypes[fieldName], -1) {
							labelType := match[1]
							valueType := match[2]

							switch arrays := fieldValue.(type) {
							case []interface{}:
								for _, array := range arrays {
									switch tuple := array.(type) {
									case []interface{}:
										tsName := ParseValue(fieldName, labelType, timeZonesMap[fieldName], tuple[0], false)
										tsValue := ParseValue(fieldName, valueType, timeZonesMap[fieldName], tuple[1], false)
										r.createFrameIfNotExistsAndAddPoint(
											query, framesMap, tsName.(string), timeStampDataFieldMap, timestampFieldName, valueDataFieldMap,
											fieldName, valueType, timestampValue, timeZonesMap, tsValue,
										)

									default:
										return nil, fmt.Errorf("unable to parse data section type=%T in response json: %s", tuple, tuple)
									}
								}
							default:
								return nil, fmt.Errorf("unable to parse data section name=%s type=%T in response json: %s", fieldName, fieldValue, fieldValue)
							}

						}

					} else {
						frameName := fieldName
						r.createFrameIfNotExistsAndAddPoint(query, framesMap, frameName, timeStampDataFieldMap, timestampFieldName, valueDataFieldMap, fieldName, metaTypes[fieldName], timestampValue, timeZonesMap, fieldValue)
					}
				}
			}
		}
	}
	for _, frame := range framesMap {
		frames = append(frames, frame)
	}
	return frames, nil
}

func (r *Response) analyzeResponseMeta(fetchTZ FetchTZFunc) (map[string]*time.Location, map[string]string) {
	ServerTZ := fetchTZ()
	timeZonesMap := map[string]*time.Location{}
	metaTypes := map[string]string{}

	for _, meta := range r.Meta {
		metaTypes[meta.Name] = meta.Type
		if strings.Contains(meta.Type, "Date") {
			timeZonesMap[meta.Name] = fetchTimeZoneFromFieldType(meta.Type, ServerTZ)
		}
	}
	return timeZonesMap, metaTypes
}

func (r *Response) createFrameIfNotExistsAndAddPoint(query *Query, framesMap map[string]*data.Frame, frameName string, timeStampDataFieldMap map[string]*data.Field, timestampFieldName string, valueDataFieldMap map[string]*data.Field, fieldName string, fieldType string, timestampValue time.Time, timeZonesMap map[string]*time.Location, fieldValue interface{}) {
	if _, frameExists := framesMap[frameName]; !frameExists {
		timeStampDataFieldMap[frameName] = data.NewField(timestampFieldName, nil, []time.Time{})
		valueDataFieldMap[frameName] = NewDataFieldByType(frameName, fieldType)
		framesMap[frameName] = data.NewFrame(
			frameName,
			timeStampDataFieldMap[frameName],
			valueDataFieldMap[frameName],
		)

		framesMap[frameName].RefID = query.RefId
	}
	timeStampDataFieldMap[frameName].Append(timestampValue)
	valueDataFieldMap[frameName].Append(ParseValue(fieldName, fieldType, timeZonesMap[fieldName], fieldValue, false))
}

func (r *Response) generateFrameNameByLabels(row map[string]interface{}, metaTypes map[string]string, labelFieldsMap map[string]int) string {
	frameName := ""
	for fieldName, fieldValue := range row {
		if _, isLabel := labelFieldsMap[fieldName]; isLabel {
			fieldType := metaTypes[fieldName]
			frameName += fmt.Sprintf("%v", ParseValue(fieldName, fieldType, nil, fieldValue, false)) + ", "
		}
	}
	if frameName != "" {
		frameName = frameName[0 : len(frameName)-2]
	}
	return frameName
}

func (r *Response) toFramesTable(query *Query, fetchTZ FetchTZFunc) (data.Frames, error) {
	timeZonesMap, metaTypes := r.analyzeResponseMeta(fetchTZ)
	framesMap := map[string]*data.Frame{}
	frames := data.Frames{}
	for _, field := range r.Meta {
		framesMap[field.Name] = data.NewFrame(field.Name, NewDataFieldByType(field.Name, field.Type))
		framesMap[field.Name].RefID = query.RefId
	}
	for _, row := range r.Data {
		for fieldName, fieldValue := range row {
			framesMap[fieldName].Fields[0].Append(ParseValue(
				fieldName, metaTypes[fieldName], timeZonesMap[fieldName], fieldValue, false,
			))
		}
	}
	for _, frame := range framesMap {
		frames = append(frames, frame)
	}
	return frames, nil
}

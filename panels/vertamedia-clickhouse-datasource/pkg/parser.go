package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
)

var datePrefix = "Date"
var dateTimePrefix = "DateTime"
var dateTime64Prefix = "DateTime64"
var timeZonePrefix = "('"
var timeZone64Separator = ","
var dateTZPrefix = datePrefix + timeZonePrefix
var dateTimeTZPrefix = dateTimePrefix + timeZonePrefix
var dateTime64TZPrefix = dateTime64Prefix + timeZonePrefix

var dateLayout = "2006-01-02"
var dateTimeLayout = dateLayout + " 15:04:05"
var dateTime64Layout3 = dateTimeLayout + ".000"
var dateTime64Layout6 = dateTimeLayout + ".000000"

type FetchTZFunc = func() *time.Location
type Value interface{}

func ParseTimeZone(tz string) *time.Location {
	location, err := time.LoadLocation(tz)

	if err == nil {
		return location
	} else {
		return time.UTC
	}
}

var dateTimeTypeRE = regexp.MustCompile(`(Date\([^)]+\)|DateTime\([^)]+\)|DateTime64\([^)]+\))`)

func extractTimeZoneNameFromFieldType(fieldType string) string {
	tz := ""
	if strings.HasPrefix(fieldType, dateTZPrefix) {
		tz = fieldType[len(dateTZPrefix)+1 : len(fieldType)-2]
	} else if strings.HasPrefix(fieldType, dateTimeTZPrefix) {
		tz = fieldType[len(dateTimeTZPrefix)+1 : len(fieldType)-2]
	} else if strings.HasPrefix(fieldType, dateTime64TZPrefix) && strings.Contains(fieldType, timeZone64Separator) {
		tz = fieldType[strings.Index(fieldType, timeZone64Separator)+3 : len(fieldType)-2]
	} else if complexTypeRE.MatchString(fieldType) {
		if matches := dateTimeTypeRE.FindAllStringSubmatch(fieldType, 1); len(matches) > 0 {
			return extractTimeZoneNameFromFieldType(matches[0][1])
		}
	}
	return strings.Trim(tz, " \t\v\n\r")
}

func fetchTimeZoneFromFieldType(fieldType string, tzFromServer *time.Location) *time.Location {
	tz := extractTimeZoneNameFromFieldType(fieldType)

	if tz != "" {
		return ParseTimeZone(tz)
	} else {
		return tzFromServer
	}
}

func NewDataFieldByType(fieldName, fieldType string) *data.Field {

	if strings.HasPrefix(fieldType, "LowCardinality") {
		fieldType = strings.TrimSuffix(strings.TrimPrefix(fieldType, "LowCardinality("), ")")
	}

	isNullable := strings.Contains(fieldType, "Nullable")
	fieldType = strings.TrimSuffix(strings.TrimPrefix(fieldType, "Nullable("), ")")

	switch fieldType {
	case "String", "UUID", "IPv6", "IPv4":
		return newStringField(fieldName, isNullable)
	case "UInt8", "UInt16", "UInt32", "Int8", "Int16", "Int32", "Float32", "Float64":
		return newFloat64Field(fieldName, isNullable)
	case "UInt64":
		// This can be a time or uint64 value
		// Assume that t is the field name used for timestamp
		if fieldName == "t" && !isNullable {
			return data.NewField(fieldName, nil, []time.Time{})
		}

		if isNullable {
			return data.NewField(fieldName, nil, []*uint64{})
		} else {
			return data.NewField(fieldName, nil, []uint64{})
		}
	case "Int64":
		if isNullable {
			return data.NewField(fieldName, nil, []*int64{})
		} else {
			return data.NewField(fieldName, nil, []int64{})
		}
	default:
		if strings.HasPrefix(fieldType, "Decimal") {
			return newFloat64Field(fieldName, isNullable)
		} else if strings.HasPrefix(fieldType, "FixedString") || strings.HasPrefix(fieldType, "Enum") {
			return newStringField(fieldName, isNullable)
		} else if strings.HasPrefix(fieldType, dateTime64Prefix) || strings.HasPrefix(fieldType, dateTimePrefix) || strings.HasPrefix(fieldType, datePrefix) {
			return newTimeField(fieldName, isNullable)
		} else {
			return newStringField(fieldName, isNullable)
		}
	}
}

func newTimeField(fieldName string, isNullable bool) *data.Field {
	if isNullable {
		return data.NewField(fieldName, nil, []*time.Time{})
	} else {
		return data.NewField(fieldName, nil, []time.Time{})
	}
}

func newFloat64Field(fieldName string, isNullable bool) *data.Field {
	if isNullable {
		return data.NewField(fieldName, nil, []*float64{})
	} else {
		return data.NewField(fieldName, nil, []float64{})
	}
}

func newStringField(fieldName string, isNullable bool) *data.Field {
	if isNullable {
		return data.NewField(fieldName, nil, []*string{})
	} else {
		return data.NewField(fieldName, nil, []string{})
	}
}

func parseFloatValue(value interface{}, isNullable bool) Value {
	if value != nil {
		fv := reflect.ValueOf(value).Float()
		if isNullable {
			return &fv
		} else {
			return fv
		}
	}

	if isNullable {
		return nil
	} else {
		return 0.0
	}
}

func parseStringValue(value interface{}, isNullable bool) Value {
	if value != nil {
		str := reflect.ValueOf(value).String()
		if isNullable {
			return &str
		} else {
			return str
		}
	}

	if isNullable {
		return nil
	} else {
		return ""
	}
}

func parseUInt64Value(value interface{}, isNullable bool) Value {
	if value != nil {
		ui64v, err := strconv.ParseUint(fmt.Sprintf("%v", value), 10, 64)

		if err == nil {
			if isNullable {
				return &ui64v
			} else {
				return ui64v
			}
		}
	}
	if isNullable {
		return nil
	} else {
		return uint64(0)
	}
}

func parseInt64Value(value interface{}, isNullable bool) Value {
	if value != nil {
		i64v, err := strconv.ParseInt(fmt.Sprintf("%v", value), 10, 64)

		if err == nil {
			if isNullable {
				return &i64v
			} else {
				return i64v
			}
		}
	}

	if isNullable {
		return nil
	} else {
		return int64(0)
	}
}

func parseTimestampValue(value interface{}, isNullable bool) Value {
	if value != nil {
		strValue := fmt.Sprintf("%v", value)
		i64v, err := strconv.ParseInt(strValue, 10, 64)

		if err == nil {
			// Convert millisecond timestamp to nanosecond timestamp for parsing
			timeValue := time.Unix(0, i64v*int64(time.Millisecond))
			if isNullable {
				return &timeValue
			} else {
				return timeValue
			}
		}
	}

	if isNullable {
		return nil
	} else {
		return time.Unix(0, 0)
	}
}

func parseDateTimeValue(value interface{}, layout string, timezone *time.Location, isNullable bool) Value {
	if value != nil {
		strValue := fmt.Sprintf("%v", value)
		t, err := time.ParseInLocation(layout, strValue, timezone)

		if err == nil {
			if isNullable {
				return &t
			} else {
				return t
			}
		}
	}
	if isNullable {
		return nil
	} else {
		return time.Unix(0, 0)
	}
}

func ParseValue(fieldName string, fieldType string, tz *time.Location, value interface{}, isNullable bool) Value {
	if strings.HasPrefix(fieldType, "Nullable") {
		return ParseValue(fieldName, strings.TrimSuffix(strings.TrimPrefix(fieldType, "Nullable("), ")"), tz, value, true)
	} else if strings.HasPrefix(fieldType, "LowCardinality") {
		return ParseValue(fieldName, strings.TrimSuffix(strings.TrimPrefix(fieldType, "LowCardinality("), ")"), tz, value, isNullable)
	} else {
		switch fieldType {
		case "String", "UUID", "IPv4", "IPv6":
			return parseStringValue(value, isNullable)
		case "UInt8", "UInt16", "UInt32", "Int8", "Int16", "Int32", "Float32", "Float64":
			return parseFloatValue(value, isNullable)
		case "UInt64":
			// Plugin specific corner case
			// This can be a time or uint64 value Assume that t is the field name used for timestamp in milliseconds
			if fieldName == "t" {
				return parseTimestampValue(value, isNullable)
			}

			return parseUInt64Value(value, isNullable)
		case "Int64":
			return parseInt64Value(value, isNullable)
		default:
			if strings.HasPrefix(fieldType, "Decimal") {
				return parseFloatValue(value, isNullable)
			} else if strings.HasPrefix(fieldType, "FixedString") || strings.HasPrefix(fieldType, "Enum") {
				return parseStringValue(value, isNullable)
			} else if strings.HasPrefix(fieldType, dateTime64Prefix) && strings.Contains(fieldType, "3") {
				return parseDateTimeValue(value, dateTime64Layout3, tz, isNullable)
			} else if strings.HasPrefix(fieldType, dateTime64Prefix) && strings.Contains(fieldType, "6") {
				return parseDateTimeValue(value, dateTime64Layout6, tz, isNullable)
			} else if strings.HasPrefix(fieldType, dateTimePrefix) {
				return parseDateTimeValue(value, dateTimeLayout, tz, isNullable)
			} else if strings.HasPrefix(fieldType, datePrefix) {
				return parseDateTimeValue(value, dateLayout, tz, isNullable)
			} else {
				backend.Logger.Warn(fmt.Sprintf(
					"Value [%v] has compound type [%v] and will be returned as string", value, fieldType,
				))

				byteValue, err := json.Marshal(value)
				if err != nil {
					backend.Logger.Warn(fmt.Sprintf(
						"Unable to append value of unknown type %v because of json encoding problem: %s",
						reflect.TypeOf(value), err,
					))
					return nil
				}

				return parseStringValue(string(byteValue), isNullable)
			}
		}
	}
}

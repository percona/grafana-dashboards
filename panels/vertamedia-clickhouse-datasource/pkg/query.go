package main

import (
	"regexp"
	"strconv"
	"strings"
	"time"
)

var FormatJson = "FORMAT JSON"

var DefaultQuery = "SELECT 1 FORMAT JSON;"

/* TODO Ugly hack cover 80% corner cases, think about how to port sql_query.ts+scanner.ts to Golang, or try to figure out howto tricksterproxy.io parse SQL query to detect timeRange */

var FromValueRE = regexp.MustCompile(`(?miU)>=\s+toDate\s*\((\d+)\)|>=\s+toDateTime\s*\((\d+)\)|>=\s+toDateTime64\s*\((\d+), 3\)|BETWEEN\s+toDate\s*\((\d+)\)|BETWEEN\s+toDateTime\s*\((\d+)\)`)
var ToValueRE = regexp.MustCompile(`(?miU)<=\s+toDate\s*\((\d+)\)|<=\s+toDateTime\s*\((\d+)\)|<=\s+toDateTime64\s*\((\d+), 3\)|BETWEEN[\s\S]+AND\s+toDate\s*\((\d+)\)|BETWEEN[\s\S]+AND\s+toDateTime\s*\((\d+)\)`)

type Query struct {
	RefId    string `json:"refId"`
	RawQuery string `json:"rawQuery"`
	From     time.Time
	To       time.Time
}

func (query *Query) ApplyTimeRangeToQuery() string {
	fmtQuery := strings.Trim(query.RawQuery, ";\r\n\t ")

	if !strings.HasSuffix(fmtQuery, FormatJson) {
		fmtQuery = fmtQuery + " " + FormatJson
	}
	fmtQuery = formatTimeValue(fmtQuery, query.From, FromValueRE)
	fmtQuery = formatTimeValue(fmtQuery, query.To, ToValueRE)

	return fmtQuery + " /* alerts query */;"
}

func formatTimeValue(fmtQuery string, fmtTime time.Time, fmtRE *regexp.Regexp) string {
	matches := fmtRE.FindStringSubmatch(fmtQuery)

	if matches != nil {
		for i := 1; i < len(matches); i++ {
			if len(matches[i]) > 0 {
				if matched, err := regexp.MatchString(`\d+`, matches[i]); err == nil && matched {
					fmtQuery = strings.Replace(fmtQuery, matches[i], strconv.FormatInt(fmtTime.Unix(), 10), -1)
				}
			}
		}
	}
	return fmtQuery
}

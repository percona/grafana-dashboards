package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

const TimeZoneFieldName = "timezone()"

var TimeZoneQuery = fmt.Sprintf("SELECT %s FORMAT JSON;", TimeZoneFieldName)

type ClickHouseClient struct {
	settings *DatasourceSettings
}

func (client *ClickHouseClient) Query(query string) (*Response, error) {

	onErr := func(err error) (*Response, error) {
		backend.Logger.Error(fmt.Sprintf("clickhouse client query error: %v", err))
		return nil, err
	}

	datasourceUrl, err := url.Parse(client.settings.Instance.URL)
	if err != nil {
		return onErr(fmt.Errorf("unable to parse clickhouse datasource url: %w", err))
	}

	httpClient := &http.Client{}

	req, err := http.NewRequest(
		"POST",
		datasourceUrl.String(),
		bytes.NewBufferString(query))
	if err != nil {
		return onErr(err)
	}

	if client.settings.Instance.BasicAuthEnabled {
		password, _ := client.settings.Instance.DecryptedSecureJSONData["basicAuthPassword"]
		req.Header.Set("X-ClickHouse-User", client.settings.Instance.BasicAuthUser)
		req.Header.Set("X-ClickHouse-Key", password)
	} else if client.settings.UseYandexCloudAuthorization {
		req.Header.Set("X-ClickHouse-User", client.settings.XHeaderUser)
		req.Header.Set("X-ClickHouse-Key", client.settings.XHeaderKey)
	}

	resp, err := httpClient.Do(req)
	if err != nil {
		return onErr(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return onErr(err)
	}

	if resp.StatusCode != 200 {
		return onErr(errors.New(string(body)))
	}

	var jsonResp = &Response{}
	err = json.Unmarshal(body, jsonResp)
	if err != nil {
		return onErr(fmt.Errorf("unable to parse json %s. Error: %w", body, err))
	}

	return jsonResp, nil
}

func (client *ClickHouseClient) FetchTimeZone() *time.Location {
	res, err := client.Query(TimeZoneQuery)

	if err == nil && res != nil && len(res.Data) > 0 && res.Data[0] != nil {
		return ParseTimeZone(fmt.Sprintf("%v", res.Data[0][TimeZoneFieldName]))
	}

	return time.UTC
}

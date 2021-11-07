package main

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
)

// DatasourceSettings TODO Add Support custom headers
type DatasourceSettings struct {
	Instance backend.DataSourceInstanceSettings

	AddCorsHeader               bool   `json:"addCorsHeader"`
	DefaultDatabase             string `json:"defaultDatabase"`
	UsePost                     bool   `json:"usePOST"`
	UseYandexCloudAuthorization bool   `json:"useYandexCloudAuthorization"`
	XHeaderKey                  string `json:"xHeaderKey"`
	XHeaderUser                 string `json:"xHeaderUser"`
}

func NewDatasourceSettings(settings backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	var dsSettings = DatasourceSettings{}

	err := json.Unmarshal(settings.JSONData, &dsSettings)
	if err != nil {
		return nil, fmt.Errorf("unable to parse settings json %s. Error: %w", settings.JSONData, err)
	}

	dsSettings.Instance = settings

	return &dsSettings, nil
}

func (s *DatasourceSettings) Dispose() {}

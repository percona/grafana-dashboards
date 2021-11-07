package main

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"golang.org/x/net/context"
)

func GetDatasourceServeOpts() datasource.ServeOpts {
	ds := &ClickHouseDatasource{
		im: datasource.NewInstanceManager(NewDatasourceSettings),
	}

	return datasource.ServeOpts{
		QueryDataHandler:   ds,
		CheckHealthHandler: ds,
	}
}

type ClickHouseDatasource struct {
	im instancemgmt.InstanceManager
}

func (ds *ClickHouseDatasource) getClient(ctx backend.PluginContext) (*ClickHouseClient, error) {
	im, err := ds.im.Get(ctx)
	if err != nil {
		return nil, err
	}

	return &ClickHouseClient{
		settings: im.(*DatasourceSettings),
	}, nil
}

func (ds *ClickHouseDatasource) query(ctx backend.PluginContext, query *Query) backend.DataResponse {

	onErr := func(err error) backend.DataResponse {
		backend.Logger.Error(fmt.Sprintf("Datasource query error: %s", err))
		return backend.DataResponse{Error: err}
	}

	client, err := ds.getClient(ctx)
	if err != nil {
		return onErr(err)
	}
	sql := query.ApplyTimeRangeToQuery()
	clickhouseResponse, err := client.Query(sql)
	if err != nil {
		return onErr(err)
	}

	frames, err := clickhouseResponse.toFrames(query, client.FetchTimeZone)
	if err != nil {
		return onErr(err)
	}

	backend.Logger.Debug("queryResponse: ", sql, frames)
	return backend.DataResponse{
		Frames: frames,
	}
}

func (ds *ClickHouseDatasource) QueryData(
	ctx context.Context,
	req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {

	onErr := func(err error) (*backend.QueryDataResponse, error) {
		backend.Logger.Error(fmt.Sprintf("QueryData error: %v", err))
		return nil, err
	}

	response := backend.NewQueryDataResponse()

	for _, query := range req.Queries {
		var q = Query{
			From: query.TimeRange.From,
			To:   query.TimeRange.To,
		}
		err := json.Unmarshal(query.JSON, &q)
		if err != nil {
			return onErr(fmt.Errorf("unable to parse json %s. Error: %w", query.JSON, err))
		}

		response.Responses[q.RefId] = ds.query(req.PluginContext, &q)
	}

	return response, nil
}

func (ds *ClickHouseDatasource) CheckHealth(
	ctx context.Context,
	req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {

	onErr := func(err error) (*backend.CheckHealthResult, error) {
		backend.Logger.Error(fmt.Sprintf("HealthCheck error: %v", err))
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: err.Error(),
		}, err
	}

	client, err := ds.getClient(req.PluginContext)
	if err != nil {
		return onErr(err)
	}
	_, err = client.Query(DefaultQuery)
	if err != nil {
		return onErr(err)
	}

	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "OK",
	}, nil
}

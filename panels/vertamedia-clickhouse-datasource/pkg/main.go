package main

import (
	"os"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
)

func main() {
	backend.Logger.Info("Starting ClickHouse datasource backend...")
	err := datasource.Serve(GetDatasourceServeOpts())

	if err != nil {
		backend.Logger.Error(err.Error())
		os.Exit(1)
	}
}

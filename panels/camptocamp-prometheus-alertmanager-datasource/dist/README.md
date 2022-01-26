# Grafana datasource for Prometheus Alertmanager

This datasource lets you use the Alertmanager's API of Prometheus to create dashboards in Grafana.

![Overview](https://raw.githubusercontent.com/camptocamp/grafana-prometheus-alertmanager-datasource/master/images/overview.png)

# Usage

## Query Editor

The following options are available:

### Receiver

Only retrieve alerts that match the defined receiver. If left empty, all receivers will be matched.

### Filters

Into the query expression field, you can set filters.

Examples:

 - `alertname="HostDown"` will only display alerts which has the label *alertname* equals to "HostDown".
 - `severity="1"` will only display alerts which has the label *severity* equals to "1".

You can also set multiple filters like `alertname="DiskFull",df="opt"`.

### Active

Whether the alerts gathered should be active.

### Silenced

Whether the alerts gathered should be silenced.

### Inhibited

Whether the alerts gathered should be inhibited.

![Parameters](https://raw.githubusercontent.com/camptocamp/grafana-prometheus-alertmanager-datasource/master/images/table.png)

# Development Setup

Usage of Yarn is encouraged to build.

```shell
$ yarn install
$ yarn run build
```

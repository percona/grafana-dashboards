# Grafana datasource for Prometheus Alertmanager

This datasource lets you to use the Alertmanager's API of Prometheus to create dashboards in Grafana.

![Overview](https://raw.githubusercontent.com/camptocamp/grafana-prometheus-alertmanager-datasource/master/images/overview.png)


# Panels

The only two formats available are **table** and **single**.

# Usage

Into the query expression field, you can set filters.

Examples:

 - `alertname="HostDown"` will only display alerts which has the label *alertname* equals to "HostDown".
 - `severity="1"` will only display alerts which has the label *severity* equals to "1".

You can also set multiple parameters like `alertname="DiskFull", df="opt"`.

![Parameters](https://raw.githubusercontent.com/camptocamp/grafana-prometheus-alertmanager-datasource/master/images/table.png)

You can display one label or more into the message field by setting labels name into the "Legend format" field.

Example:

 - `{{msg}}` will display the content of the label "msg".
 - `Host: {{host}} / IP: {{ip}}` will display the following content: "Host: [host_value] / IP: [ip_value]"


*To set labels in your alerts, you can follow the Prometheus's documentation: [https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/).*

# Variable Templating

This datasource has basic support for Grafana's variable templating queries. 

The following functions are implemented.

 - `label_values(query,key)` will return all the label values of the alerts returned by the query.  The query parameter is optional.
 - `annotation_values(query,key)` same as above for annotations.
 - `label_names(query)` will return all the label names of the alerts returned.
 - `annotation_names(query)` same as above for annotations.
 - `[(labels|annotations|receivers|generatorURL)](query)` returns whatever path is specified by key, for instance `labels(query)` will return a JSON string of labels.
 
If a function is not specified, the alert will be returned as the complete json string  


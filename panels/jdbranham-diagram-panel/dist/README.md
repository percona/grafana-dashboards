[![Build Status](https://travis-ci.org/jdbranham/grafana-diagram.svg?branch=master)](https://travis-ci.org/jdbranham/grafana-diagram)

# grafana-diagram

This is a Grafana panel plugin that provides a way to create flow-charts, sequence diagrams, and gantt charts by leveraging the mermaid.js library.



* A diagram can be defined using the Mermaid JS syntax.  
* Metric series are used to color the background of the shape/node.  
* The target or 'alias' of the series is compared to the ID of the diagram node to find a match, then applies a 'fill' style to the shape.  
* Composites can be used to aggregate multiple series for a single node, with custom thresholds for each series.

**Note - Special characters in an alias are replace with an underscore. See character replacement below

## Development

For easy development, use the `docker-compose.yml`.

In a terminal - 
`docker-compose up -d`
Grafana will start on port 3000 with user/pass = `admin`  
The plugin project will be mounted inside the docker container so changes are reflected immediately.  
Add a new dashboard with the diagram plugin to test changes.  

`npm run watch`  
The diagram plugin will watch for changes in the project, and rebuild.  

Open the plugin files in your favorite editor and make changes.  
Refresh your browser to see the diagram plugin changes.  

## Character Replacement

The following characters in metric names are automatically replaced with an underscore.

```
" , ; = : { }
```

You can add additional metric replacements in the Display tab, under the section Metric Character Replacement:

![Diagram](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/grafana-diagram-metric-replacement-option.png?raw=true)  

A single character can be specified or a regular expression, along with the text to be used for the replacement (the default is underscore).


## Examples  


### Diagram  

![Diagram](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram.PNG?raw=true)  



### Diagram Definition  

![Diagram Definition](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_definition.PNG?raw=true)  



### Display Options  

* Thresholds
* Aggregation Options
* Unbound Color Levels
* Gradient Option for Heatmap style coloring
* Series Specific Overrides are used to specify:
  1. Threshold to apply to metric
  2. Color Inversion
  3. Value of metric to display (average/current/etc)
  4. Value decimal precision
  5. Unit Format

![Diagram Display Options](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_display.PNG?raw=true)  

### With Gradient Coloring  

![Diagram Heatmap](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_gradient.PNG?raw=true)

### Metrics  

Graphite Datasource  
![Metrics](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_metrics_graphite.PNG?raw=true)



### Prometheus  

With prometheus, be sure to use the transformed alias [with underscores]  
Metric  
![Metrics](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_metrics_prometheus.PNG?raw=true)  

Example Diagram -  
![Prometheus Diagram](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/diagram_prometheus.PNG?raw=true)  

### InfluxDB
![InfluxDB Metrics](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-metrics-influx.png?raw=true)

### Link Metrics
Mermaid Notation is the same, but now supports supplying a metric name in the "text".

Specify the metric name in double quotes (for escaping purposes), and optionally use a metric modifier.

#### Prefix Modifier For Composites

| Modifier | Description | Example | Output |
|----------|-------------|---------|--------|
|   #      | Raw Value of Series (no decimal limit)| "#metric" | 8.123456789
|   !      | Raw Value plus Metric Name | "!metric" | metric: 8.123456789
|   @      | Formatted (Decimal Limited and Unit Format)| "@metric" | 8.12 Mbps
|   &      | Formatted (Decimal Limited, Unit Format, and Metric Name) | "&metric" | metric: 8.12 Mbps

#### Prefix Modifier For Series

| Modifier | Description | Example | Output |
|----------|-------------|---------|--------|
|   #      | Raw Value of Series (no decimal limit)| "#metric" | 8.123456789
|   @      | Formatted (Decimal Limited and Unit Format)| "@metric" | 8.12 Mbps

### Metric Composites
To reflect multiple metrics and their thresholds on a single node, use metric composites to specify a composite name, and the metrics to be evaluated for the composite.

Series specific overrides will be evaluated for each metric, and the "worst" state of the composite is displayed.

The composite name is evaluated in the Diagram definition.

For example, combining two series "A-series" and "B-series" into a single composite named "xyz", the following can be used:

![Composite Editor](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-edit-tab.png?raw=true)

With series specific overrides for these two series:

![Composite Overrides](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-overrides.png?raw=true)

When data is received for each series, the thresholds will be evaluated to find the "worst" threshold level, and the metrics and color value will be reflected in the "xyz" composite in the diagram.

Here are examples of the composite in action:

This diagram has "xyz" node, with "all green" threholds for both series A and B:

![threshold0](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-threshold0.png?raw=true)

This diagram has "xyz" node, where the A-series is green, but B-Series is yellow. The diagram node shows yellow, along with the value:

![threshold1](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-threshold1.png?raw=true)

This diagram has "xyz" node, where the A-series is green, but B-Series is red. The diagram node shows red, along with the value:

![threshold2](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-threshold2.png?raw=true)

This diagram has "xyz" node, where the A-series is yellow, and B-Series is green. The diagram node shows yellow, along with the value:

![threshold3](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/composite-threshold3.png?raw=true)

### Value or Range to Text Mapping

Value and range mapping can be used to replace numeric values by human readable text. 

To map values or ranges to text define one more mapping descriptions using aliases or regular expressions matching aliases:

![Mapping Editor](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/mapping-editor-tab.png?raw=true)

In the diagram the value of the matching series will be mapped to text:

![Value Mapping](https://raw.githubusercontent.com/jdbranham/grafana-diagram/master/src/img/mapping-value.png?raw=true)

## Roadmap  

- [suggest something]  

## Upgrading  

### v1.2 to >1.3.x  

#### Cannot read property 'enabled' of undefined

Add an empty 'gradient' object to the panel json 'legend' object  

  "legend": {
    "avg": true,
    "current": true,
    "max": true,
    "min": false,
    "show": true,
    "total": false,
    "gradient": {}
  },

## Thanks!  


Special thanks to the Mermaid contributors -  
https://github.com/knsv/mermaid/graphs/contributors  
https://knsv.github.io/mermaid/  

and the D3 contributors -  
https://github.com/d3/d3/graphs/contributors  

And especially the Grafana contributors -  
https://github.com/grafana/grafana/graphs/contributors   
http://grafana.org/  

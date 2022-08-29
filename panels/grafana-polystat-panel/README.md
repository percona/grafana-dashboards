# Grafana Polystat Panel

[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22grafana-polystat-panel%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/grafana-polystat-panel)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22grafana-polystat-panel%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/grafana-polystat-panel)
[![License](https://img.shields.io/github/license/grafana/grafana-polystat-panel)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/grafana/grafana-polystat-panel/badge.svg)](https://snyk.io/test/github/grafana/grafana-polystat-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c5cd1076777c637b931/maintainability)](https://codeclimate.com/github/grafana/grafana-polystat-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5c5cd1076777c637b931/test_coverage)](https://codeclimate.com/github/grafana/grafana-polystat-panel/test_coverage)
[![Build Status](https://drone.grafana.net/api/badges/grafana/grafana-polystat-panel/status.svg)](https://drone.grafana.net/grafana/grafana-polystat-panel)

This panel plugin provides a [D3-based](http://www.d3js.org) multistat panel for [Grafana](https://grafana.com/) 7.3+.

A hexagon is created for each metric received, with the ability to group metrics into a composite metric, and display the triggered state of the composite.

## Screenshots

This plugin supports autoscaling for best-fit sizing of each polygon to the panel size. When the complete text cannot be displayed, only tooltips are active.

### All visible

![Scaled3](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-scaled3.png)

### Scaled down

![Scaled1](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-scaled1.png)

### Scaled down with tooltip

![Scaled2](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-scaled2.png)

## Options

![State with Composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-all.png)

### Layout

![Layout](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-layout.png)

Specify the desired number of columns and rows, or select Autosize to allow the plugin to calculate a "best fit" for the size of the panel.

#### Columns

Max # of columns to create

#### Rows

Max # rows to create
NOTE: if both columns and rows are set, only rows*columns will be displayed, generally one or none should be set.

#### Display Limit

Set a limit on number of hexagons to be displayed, set to 0 for no limit.

### Sizing

![Sizing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-sizing.png)

Set the size of the polygon to a fixed size, or select auto-size for "best fit".

### Sorting

![Sorting](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-sorting.png)

### Tooltips

![Tooltips](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-tooltips.png)

Set the font to be used for Tooltips

### Global

![Global](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-global.png)

#### Display

Show all
Show triggered

![Show all example](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-show-all-example.png)

### Global Aliasing

This field allows you to specify a regular expression to pick a portion of matching metric names to be rendered instead of the full name.

If you have these 3 Queries, returning a series:
Foo-A, values 1,2,3
Bar-B, values 4,5,6
Misc, values 7,8,9

![Before Aliasing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/regex-alias-before.png)

Adding the regular expression: `/(Foo|Bar)/`, will display:

![After Aliasing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/regex-alias-after.png)

Specify a regular expression to pick a portion of matching metric names.

### Actions

#### Click Through

Click through to use when none are defined for a hexagon.

#### Show Metric Name

Display the metric in the hexagon

#### Show Metric Value

Display the metric value

## Overrides

![Overrides without Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-overrides-no-thresholds.png)

![Overrides with Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-overrides-all.png)

![Overrides Rendered](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-overrides-gpu0-rendered.png)

## Composites

![Composites with Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-composites-all.png)

![Composite Rendered with Tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-composites-with-tooltip.png)

### Animation

![Animation](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-options-animation.png)

#### Animate Composites

Animate hexagon to display metrics if there are composites

![Animation Example](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-composites-animated.png)

#### Speed

Speed of animation in milliseconds

## Thresholds

This plugin supports "ranged" states.

Thresholds are expected to be sorted by ascending value, where

```TEXT
T0 = lowest decimal value, any state
TN = highest decimal value, any state
```

Initial state is set to "ok"

A comparison is made using "greater than or equal to" against the value
  `If value >= thresholdValue state = X`

Comparisons are made in reverse order, using the range between the Nth (inclusive) threshold and N+1 (exclusive)

```TEXT
  InclusiveValue = T(n).value
  ExclusiveValue = T(n+1).value
```

When there is no n+1 threshold, the highest value threshold T(n), a simple inclusive >= comparison is made

Example 1: (typical linear)

```TEXT
    T0 - 5, ok
    T1 - 10, warning
    T2 - 20, critical
```

```TEXT
  Value >= 20 (Value >= T2)
  10 <= Value < 20  (T1 <= Value < T2)
  5 <= Value < 10   (T0 <= Value < T1)
```

Example 2: (reverse linear)

```TEXT
    T0 - 50, critical
    T1 - 90, warning
    T2 - 100, ok
```

```TEXT
  Value >= 100
  90 <= value < 100
  50 <= value < 90
```

Example 3: (bounded)

```TEXT
    T0 - 50, critical
    T1 - 60, warning
    T2 - 70, ok
    T3 - 80, warning
    T4 - 90, critical
```

```TEXT
    Value >= 90
    80 <= Value < 90
    70 <= Value < 80
    60 <= Value < 70
    50 <= Value < 60
```

The "worst" state is returned after checking every threshold range

## Time Range

### Additional Screenshots

#### Tooltip

Hovering over a hexagon shows the metrics that comprise the displayed state.
For composites this will expand members of the composite.

![Tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-tooltip.png)

#### State with composites

This shows creation of composites, where you select which metrics comprise the composite.

![State with Composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-composite-example1.png)

This shows composites configured for GPU 0,1,2,3, and non-grouped metrics from GPU4-7.

![State with partial composites](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/master/src/img/screenshots/polystat-gpu-state-composites.png)

### Templating

#### Using Dashboard Template Variables

Template variables are available in the clickThroughUrl setting, specified by using ${varname}.
They can also be passed to another dashboard by appending var-VARNAME=value to the url

```URL
/dashboard/xyz?var-VARNAME=${VARNAME}
```

Overrides using regular expressions with capture groups provide addition variables that can be referenced in a clickthroughUrl.

Example:

Regular Expression: `/TEMP_(?<A_HOST>.*)_/`
Clickthrough URL: `/grafana/d/eCLHPr57k/drilldown?orgId=1&var-host=${A_HOST}`

The above example will expand the capture named group `A_HOST` and replace the value in the specified URL.

#### Using Polystat Variables

Each polygon represents either a single metric, or a composite metric

An example drilldown clickthrough url can be specified like this:

```URL
dashboard/db/drilldown?var-HOSTNAME=${__cell_name}
```

NOTE: Metrics are sorted using the global options "Sorting" settings. Global filters are also applied before dereferencing is performed.

##### Single Metric Variables

The name and value of a polygon can be referenced using the following syntax:

* Metric Name: `${__cell_name}`
* Metric Value: `${__cell}`
* Metric Raw Value: `${__cell:raw}` syntax.
   By default values are URI encoded. Use this syntax to *disable* encoding

##### Composite Metric Variables

The names and values of a composite polygon can be referenced using the following syntax:

* Composite Name: `${__composite_name}`
* Metric Name: `${__cell_name_n}`
* Metric Value: `${__cell_n}`
* Metric Raw Value: `${__cell_n:raw}` syntax.
   By default values are URI encoded. Use this syntax to *disable* encoding

## Building

This plugin relies on `@grafana/toolkit`, typical build sequence:

```BASH
yarn install
yarn build
```

For development, you can run:

```BASH
yarn watch
```

The code will be parsed then copied into "dist" if "jslint" passes without errors.

### Docker Support

A docker-compose.yml file is include for easy development and testing, just run

```BASH
docker-compose up
```

Then browse to <http://localhost:3000>

## External Dependencies

* Grafana 7.3+

## Enable Grafana TestData

`Grafana TestData` is not enabled by default. To enable it, first navigate to the Plugins section, found in your Grafana main menu. Click the Apps tabs in the Plugins section and select the Grafana TestData App. (Or navigate to <http://your_grafana_instance/plugins/testdata/edit> to go directly there). Finally click the enable button to enable.

### Acknowledgements

This panel is based on this D3 example:

* <https://www.visualcinnamon.com/2013/07/self-organizing-maps-creating-hexagonal.html>

Many thanks to contributors:

* Mathieu Rollet (matletix)
* Mattias Jiderhamn (mjiderhamn)
* AnushaBoggarapu
* KamalakarGoretta
* Rene Hennig (renehennig)
* Hamza Ziyani (HZiyani)

and many others!

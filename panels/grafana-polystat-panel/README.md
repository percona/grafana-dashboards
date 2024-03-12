# Grafana Polystat Panel

[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22grafana-polystat-panel%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/grafana-polystat-panel)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22grafana-polystat-panel%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/grafana-polystat-panel)
[![License](https://img.shields.io/github/license/grafana/grafana-polystat-panel)](LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/grafana/grafana-polystat-panel/badge.svg)](https://snyk.io/test/github/grafana/grafana-polystat-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c5cd1076777c637b931/maintainability)](https://codeclimate.com/github/grafana/grafana-polystat-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5c5cd1076777c637b931/test_coverage)](https://codeclimate.com/github/grafana/grafana-polystat-panel/test_coverage)
[![Build Status](https://drone.grafana.net/api/badges/grafana/grafana-polystat-panel/status.svg)](https://drone.grafana.net/grafana/grafana-polystat-panel)

This panel plugin provides a [D3-based](http://www.d3js.org) multi-stat panel for [Grafana](https://grafana.com/) 8.4+.

A hexagon is created for each metric received, with the ability to group metrics into a composite metric, and display the triggered state of the composite.

## Screenshots

This plugin supports autoscaling for best-fit sizing of each polygon to the panel size. When the complete text cannot be displayed, only tooltips are active.

### All visible

![polystat-v2-agent-all-visible](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-agent-all-visible.png)

### Scaled down

![polystat-v2-agent-scaled-down](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-agent-scaled-down.png)

### Scaled down with tooltip

![polystat-v2-agent-scaled-down-tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-agent-scaled-down-tooltip.png)

## Options

This panel provides a large number of customization options, and are searchable from the menu.

### Layout

By default the plugin with automatically size the polygons to be displayed using a "best fit" calculation based on the size of the panel.

![Auto Layout](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-options-layout.png)

Alternatively, you can specify both the number of columns and rows manually, or automated only one of them.

#### Columns

Max # of columns to create

#### Rows

Max # rows to create
NOTE: if both columns and rows are set, only `rows*columns` will be displayed, generally one or none should be set.

![Manual Layout](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-layout-manual.png)

If there are not enough columns and rows to display all of the data, a warning will be displayed.

![Manual Layout Warning](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-layout-warning.png)

#### Display Limit

Sets a limit for the number of polygons to be displayed. Set this to `0` for no limit (the default value is 100).

### Sizing

The size of the polygon by default is calculated for a best-fit, but it can be manually set if needed.

This section also provides an option to set a border on each polygon (the default value is 2 pixels).

![Polygon Sizing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-sizing-auto.png)

Deselect the auto-size option to manually set a size.

![Polygon Border Sizing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-sizing-manual.png)

The size of the border for each polygon can be set in this section. The color used can be found in the "Global" section.

### Text

The plugin will attempt to display as much text as possible with the largest font possible across all polygons.
The color, font size, and font family can be manually set.

#### Font Family

You can also set the font family to be used for the rendered text.
Currently the default is `Inter`, and migrations will convert from `Roboto` to `Inter`

#### Auto Scale Fonts

![Polygon Auto Text Font Size](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-text-auto-all.png)

Uncheck "Auto Scale Fonts" to manually enter a font size.

![Polygon Manual Text Font Size](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-text-manual-fontsize.png)

#### Automate Font Color

Uncheck "Automate Font Color" to manually set the font color.  The automated option uses the current theme to pick a color, which may not be suitable for all cases.

![Polygon Text Manual Font Color](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-text-manual-font-color.png)

Manually Set Font Color with color picker

![Polygon Text Font Manual Color Picker](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-text-font-color-picker.png)

### Sorting

The order (left to right) of the displayed polygons can be set with the sort options.

![Sort Settings](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-sorting.png)

The following directions are supported:

![Sorting Directions](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-sorting-directions.png)

And the following fields:

![Sorting Fields](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-sorting-fields.png)

### Tooltips

![Tooltips](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-tooltips-all.png)

#### Enable/Disable Tooltip

Toggles displaying tooltips for the panel

#### Tooltip Font Family

Sets the font family to be used in tooltips.

#### Show Timestamp

Toggles display of the timestamp at the bottom of the tooltip

#### Display mode

You can choose to display only metrics that have triggered a threshold in the tooltip, or display all metrics. This is useful when there are many metrics rolled up into a composite.

![Tooltip Display Modes](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-tooltips-display-modes.png)

#### Tooltip - Non Triggered State Text

When there are no threshold violations, this text will be displayed in the tooltip instead of the metric value.  Leave blank if you want to show the value.

#### Tooltip Sorting

The following settings are used by *composites* when there are multiple metrics to be displayed.

Tooltips have a wider set of sort options to aid in displaying important data "at the top" of the tooltip. You can specify a field and direction to first sort by, plus a secondary field and direction.  You can also disable sorting if needed.

![Tooltip Sort Directions](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-tooltips-sort-directions.png)

| Sort Direction                        |                                          |
|---------------------------------------|------------------------------------------|
| Disabled                              | No sorting is performed                  |
| Alphabetical (asc)                    | Ascending Alphabetical                   |
| Alphabetical (desc)                   | Descending Alphabetical                  |
| Numerical (asc)                       | Numerical Ascending                      |
| Numerical (descending)                | Numerical Descending                     |
| Alphabetical (case insensitive, asc)  | Case Insensitive Ascending Alphabetical  |
| Alphabetical (case insensitive, desc) | Case Insensitive Descending Alphabetical |

##### Primary Sorting

###### Primary Sort Direction (see above table)

The type of sort to be applied to the tooltip metrics.

###### Primary Sort By Field

Which field to sort by

![Tooltip Sort By Field](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-tooltips-primary-sortby-field.png)

| Sort By Field   |                                        |
|-----------------|----------------------------------------|
| Name            | name of the field - after all aliasing |
| Threshold Level | from lowest to highest                 |
| Value           | raw value                              |

##### Secondary Sorting

The secondary sorting works in the same manner as primary sorting, but can be in a different direction using a different field/threshold/value. This is applied *after* primary sorting is performed.

###### Secondary Sort Direction (see above table)

###### Secondary Sort By Field

### Global

The following settings are available in the Global section, and are detailed below.

![Global](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-global-all.png)

#### Display Mode

You can choose to display only metrics that have triggered a threshold or display all metrics.

| Display Mode |                                                        |
|--------------|--------------------------------------------------------|
| All          | All polygons are displayed                             |
| Triggered    | Only polygons with a threshold triggered are displayed |

#### Global - Non Triggered State Text

Text to be displayed in polygon when there are no triggered thresholds and global display mode is set to triggered.

#### Show Value

Show the value of the metric along with the name

#### Shape

Currently there are three shapes that can be selected, and each use a best fit method to maximize size to the panel.

![Polygon Shapes](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-global-shapes.png)

Hexagon Pointed Top

![Polygon Hexagon Pointed Top](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-shape-hexagon-pointed-top.png)

Circle

![Polygon Circle](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-shape-circle.png)

Square

![Polygon Square](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-shape-square.png)

#### Use Color Gradients

This option will apply a shaded color instead of a uniform color.

#### Global Fill Color

This is the color used when there are no thresholds that apply to the metric or composite.

#### Global Border Color

The color of the border for each polygon can be set, and is used along with the size setting above.

#### Unit

All of the unit types are available in this selector and will be applied to the value displayed.

#### Stat

Select which statistic to display for the value.  The full set of statistics that Grafana provides are available.

#### Decimals

This limits the number of decimals displayed.

#### Global Thresholds

This set of thresholds are applied to all metrics that do not have a matching override.

See the section [thresholds](#thresholds-details) below for details on how thresholds are evaluated.

#### Global Clickthrough

This clickthrough URL will be applied to all polygons that do not have an override or composite with a clickthrough specified.

##### Clickthrough - Sanitize URL

Normally this is enabled, and is intended to prevent malicious data entry.

##### Clickthrough - Open URL In New Tab

When checked, this will cause a new tab to be opened when you click on a polygon.  For drill-down dashboards, disabling this is recommended.

##### Clickthrough - Enable Custom URL Target

![Custom URL Target](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-custom-clickthrough-target.png)

When checked, this will allow you to set a custom value for the `target` attribute of the clickthrough.
NOTE: This is only visible when `Open in New Tab` is disabled.

##### Clickthrough - Custom URL Target

Specify the content for the `target` attribute of the clickthrough URL.

Typical values are: _blank|_self|_parent|_top|

### Global Aliasing

This field allows you to specify a regular expression to pick a portion of matching metric names to be rendered instead of the full name.

If you have these 3 Queries, returning a series:
Foo-A, values 1,2,3
Bar-B, values 4,5,6
Misc, values 7,8,9

![Before Aliasing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/regex-alias-before.png)

Adding the regular expression: `/(Foo|Bar)/`, will display:

![After Aliasing](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/regex-alias-after.png)

Specify a regular expression to pick a portion of matching metric names.

## Overrides

Overrides are used to apply additional rendering options for metrics, including custom thresholds and clickthroughs.

This is an example override that sets the unit for metrics that match a regular expression:

![Override without Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-overrides-no-thresholds.png)

The same override with thresholds added:

![Override with Thresholds](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-overrides-with-thresholds.png)

The final result of the above override with thresholds applied:

![Override with Thresholds Rendered](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-overrides-rendered-thresholds.png)

### Label

New in V2 is the ability to name overrides to find them easier when there are many being created. The label is not rendered on the polygon.

### Metric

The panel will provide "hints" for metric names, and allow you to enter a regular expression to match multiple metrics.

### Decimals (limit)

Sets the maximum number of decimals to be displayed. Leave this empty to show all decimals.

### Statistic to Display (Stat)

This lets you specify a different statistic to use for the matching metric, and will replace the global statistic.
As with the global setting, the full set of statistics Grafana provides are available.

### Unit Formatting

All of the unit types are available in this selector and will be applied to the value displayed.
A suffix is typically added by the formatter to indicate the unit like "B/sec" or symbols for temperatures, percentages, and similar.

### Thresholds

An override can specify a set of thresholds that are to be applied to the matching metric, and will replace any global threshold settings.

See the section [thresholds](#thresholds-details) below for details on how thresholds are evaluated.

### Prefix

Text in this field will be prepended to the rendered metric.

### Suffix

Text in this field will be appended to the rendered metric after any unit text is applied.

### Clickthrough URL

Use this to specify an URL to go to when the polygon is clicked on. Regular expression capture groups and template variables are available to form the URL.

#### Example using capture groups

For example, if we have multiple metrics like this:

```TEXT
hera_memutil
plex_memutil
```

And a regular expression for the override:

```REGEX
/(.*)_mem/
```

The capture group `$1` can be used in the url:

```TEXT
/dashboard/detail-dash?var-HOSTNAME=$1
```

The url will end up being:

`https://myserver/dashboard/detail-dash?var-HOSTNAME=hera`

For more examples using template variables and regular expression capture groups see [this section on templating](#templating)

#### Sanitize URL

Normally this is enabled, and is intended to prevent malicious data entry.

#### Open URL in New Tab

When checked, this will cause a new tab to be opened when you click on the polygon.
For drill-down dashboards, disabling this is recommended.

#### Enable Custom URL Target

![Custom URL Target](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-custom-clickthrough-target.png)

When checked, this will allow you to set a custom value for the `target` attribute of the clickthrough.
NOTE: This is only visible when `Open URL in New Tab` is disabled. This will override the equivalent global setting.

#### Custom URL Target

Specify the content for the `target` attribute of the clickthrough URL. This will override the equivalent global setting.

Typical values are: _blank|_self|_parent|_top|

### Bottom Menu

There is a menu at the bottom right side of the override that provides additional controls.

![Override Menu](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-override-bottom-menu.png)

#### Ordering

Up and Down arrows allow you move the override so you can force a different evaluation priority or simply to group similar overrides together.

#### Hide/Show

Use the "eye" icon to enable/disable the override.

#### Duplicate

This button will make a copy of the current override and append it to the end of the list.  It will have a new name with "Copy" at the end.

#### Delete

This button will delete the override completely.

## Composites

Composites allow you to combine multiple metrics into a single representation that reflects the "worst" state of the metrics combined.
This is useful as a roll-up view of more complex systems being monitored.

When there are multiple metrics to be displayed by a composite, the polygon will cycle through each of them depending on the composite configuration.

![Composites Options All](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composites-all.png)

This is what two composites look like once they are rendered:

![Composite Rendered](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composite-rendered.png)

This is the tooltip that is displayed when hovering over the composite:

![Composite Rendered with Tooltip](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composite-with-tooltip.png)

### Animation Example

When there are multiple metrics the rendered polygon will cycle through each of them based on the composite settings.

Here's an example of two composites and their animation sequence:

![Animation Example](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composite-animated.gif)

### Global Settings for Composites

There are two global settings that apply to all composites.

#### Enable Composites

A toggle is provided to quickly disable all composites from being rendered.  Additionally each composite has a hide icon to toggle its visibility.

#### Animation Speed (ms)

This setting controls how fast the animation cycle occurs (in milliseconds).

### Composite Settings

#### Composite Name

Sets the name of the composite to be rendered. This accepts a regular expression along with template variables.

Capture groups are also supported which allows you to simplify the name displayed using the alias option.

#### Show Name (composite)

This setting will hide/show the name on the displayed polygon.

#### Show Value (composite)

This setting will hide/show the values on the displayed polygon.

#### Show Members

When this is enabled, the composite is shown along with all of the metrics. Typically this is disabled and just the composite is displayed.

#### Display Mode (composite)

This will override the global display mode for just this composite.
As with the global setting, you can choose to display only metrics that have triggered a threshold or display all metrics.

| Display Mode |                                                        |
|--------------|--------------------------------------------------------|
| All          | All metrics are displayed                              |
| Triggered    | Only metrics with a threshold triggered are displayed  |

### Clickthrough URL (composite)

Use this to specify an URL to go to when the polygon is clicked on. Regular expression capture groups and template variables are available to form the URL.
See the overrides section for details on [advanced usage](#clickthrough-url).

#### Sanitize URL (composite)

Normally this is enabled, and is intended to prevent malicious data entry.

#### Open URL in New Tab (composite)

When checked, this will cause a new tab to be opened when you click on the polygon.
For drill-down dashboards, disabling this is recommended.

#### Enable Custom URL Target (composite)

![Custom URL Target](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-custom-clickthrough-target.png)

When checked, this will allow you to set a custom value for the `target` attribute of the clickthrough.
NOTE: This is only visible when `Open URL in New Tab` is disabled.

### Custom URL Target (composite)

Specify the content for the `target` attribute of the clickthrough URL.

Typical values are: _blank|_self|_parent|_top|

### Bottom Menu (composite)

There is a menu at the bottom right side of the composite that provides additional controls.

![Composite Bottom Menu](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composite-bottom-menu.png)

#### Ordering (composite)

Up and Down arrows allow you move the composite for easier grouping.

#### Hide/Show (composite)

Use the "eye" icon to enable/disable the composite.

#### Duplicate (composite)

This button will make a copy of the current composite and append it to the end of the list.  It will have a new name with "Copy" at the end.

#### Delete (composite)

This button will delete the composite completely.

### Adding Metrics to a Composite

The "Add Metric" button is used to append to the list of metrics to be included in the composite.

![Composite Add Metric](https://raw.githubusercontent.com/grafana/grafana-polystat-panel/v2.x/src/img/screenshots/polystat-v2-composite-add-metric.png)

#### Metric/Regex (composite)

The editor provides a list of metrics returned by your queries and also accepts a regular expression that may also include template variables.

NOTE: Template variables are expanded first, then the regex is applied to further filter which metrics are included in the composite.

#### Alias (composite)

If this has any content, it will be used instead of the metric name.

Capture groups from the metric name plus template variables are available to construct a new name to be displayed.

Using template variables, capture groups, and composite variables are detailed in [section below](#composite-metric-variables)

## Value Mappings

This is a built-in option in Grafana and behaves in the same manner as documented [here.](https://grafana.com/docs/grafana/latest/panels/configure-value-mappings/)

NOTE: Color assignments are ignored, only threshold colors are applied.

## Thresholds Details

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

This plugin relies on [Plugin Tools](https://github.com/grafana/plugin-tools), typical build sequence:

```BASH
yarn install
yarn build
```

The code will be parsed then copied into "dist" if "tslint" passes without errors.

For development, you can run:

```BASH
yarn dev
```

### Docker Support

A docker-compose.yml file is include for easy development and testing, just run

```BASH
docker-compose up
```

Then browse to <http://localhost:3000>

## External Dependencies

* Grafana 8.4+

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

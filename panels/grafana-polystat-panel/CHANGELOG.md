# Change Log

## Entries

## v1.2.11

- Fixes valueMappings for v8.0.x and v9.x

## v1.2.10

- Fixed issue with Grafana v9.0.0 (release)

## v1.2.9

- Now compatible with Grafana v9.0.0 (beta3)

## v1.2.8

- New Feature: Overrides can reference regex capture groupings for clickthrough urls
- New Feature: Name of an override can be set
- Fix for exported panel JSON containing extra fields

## v1.2.7

- Fix for multiple queries not displaying when one or more contain no data
- Sorting by field "value" now works #205
- Fix default fill color #201
- Display "NO DATA" instead of blank panel #199
- Minor auto-layout adjustment for better fit

## v1.2.6

- Add support for global aliasing using regular expression
- Fix custom border color #197
- Updated docs

## v1.2.5

- Fix for null data from a query stopping processing other queries

## v1.2.4

- Convert to use dataframes
- Add support for Ellipses when using Fixed Font Size Labels
- Add support for composite creation using template variable

## v1.2.3

- Fix for polygon click-through causing incorrect fill color, Issues #174 #154
- Support global value mappings in Overrides #164, Issue #159
- Compute X and Y mouse positions in mouseover #166, Issue #163
- Increase polystat-panel-tooltip z-index #165, Issue #130
- Fix for composite threshold evaluation using global thresholds #174, Issues #158 and #173
- Fix for default warning color not rendering correctly #179
- Feature: Tooltip can now be disabled (on by default), PR 158

## v1.2.2

- Fix for gradient threshold color issue #126

## v1.2.1

- Update for v6 event compatibility
- Global hide/value feature
- Fix for custom sizing #136
- Text alignment fix for "square" and "circle" shapes
- Fix for crashing issue #135
- Fix for tooltip width #133

## v1.2.0

- Grafana 7.0.0 release with plugin signing

## v1.1.0

- New: Sort options for polygons and tooltips (issue #37)
- New: Square-shape polygon now available (issue #92)
- New: Optional Global thresholds
- New: Sorting options for values and labels of polygons
- New: Templating support for overrides and composites

## v1.0.16

- fixes variable encoding in clickthrough urls

## v1.0.15

- implemented metric referencing for clickthroughs (issue #38)
- implemented composite name referencing
- implemented template variables for clickthroughs
- fixed bug with default clickthrough and sanitize url

## v1.0.14

- Update Logo
- Fixed threshold evaluation
- Added global fill color option
- Autoscaling fonts has better results
- Refactor UI for overrides, implement enable/disable
- Refactor UI for composites, implement enable/disable
- Implement global fill color for no thresholds
- Now correctly parses custom color selection

## v1.0.13

- Default to roboto font
- Default to short units and 2 decimals
- Moved panel options outside of saved config
- Add global unit format and global decimals
- No longer errors when thresholds not found
- Refactor thresholds to allow range evaluation in overrides
- Refactor and implement custom gradients for overrides

## v1.0.12

- Fixed composite state evaluations
- Added ability to set color and size of polygon border
- Single shape now centers itself
- Non-composites now show their value if possible
- New tests added to verify fixes

## v1.0.11

- Panel no longer shares data/affects other panels of same type

## v1.0.1

- Added Options -> Show Timestamp checkbox for tooltips

## v1.0.0

- Initial commit

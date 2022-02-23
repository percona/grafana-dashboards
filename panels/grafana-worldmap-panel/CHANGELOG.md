# Changelog
## Entries

## v0.3.0

- Release for Grafana 7.0 with plugin signing

## v0.2.1

- Fixes error handling that made everything disappear in edit mode, [#213](https://github.com/grafana/worldmap-panel/issues/213)
- Fixes partial (not full height) map on first render [#212](https://github.com/grafana/worldmap-panel/issues/212)

## v0.2.0

- Convert to TypeScript, webpack and Jest
- Use Yarn on CircleCI
- Add missing dev dependencies
- Tweak for incorrect height on render
  which occurs more frequently in Grafana 6.0

## v0.1.2

- Map centering ignores configured location [#149](https://github.com/grafana/worldmap-panel/issues/149) Thanks [@clompsy](https://github.com/clompsy)

## v0.1.1

- New mapping option for table data that contains latitude and longitude columns. [#144](https://github.com/grafana/worldmap-panel/pull/144) Thanks [@kylios](https://github.com/kylios)
- More mapping options for table data for datasources that cannot alias/rename the columns to the names that the Worldmap panel expects (e.g. `metric` for the metric column)
- Readme update

## v0.1.0

- Configuration option for turning mouse wheel zoom on or off. [#140](https://github.com/grafana/worldmap-panel/issues/140) Thanks [@Perlovka](https://github.com/Perlovka)
- Upgrade to Leaflet JS [#132](https://github.com/grafana/worldmap-panel/pull/132) Thanks [@cbarbier](https://github.com/cbarbier)

## v0.0.21

- Support for new data source integration, the Dynamic JSON endpoint [#103](https://github.com/grafana/worldmap-panel/issues/103), thanks [@LostInBrittany](https://github.com/LostInBrittany)
- Fix for using floats in thresholds [#79](https://github.com/grafana/worldmap-panel/issues/79), thanks [@fabienpomerol](https://github.com/fabienpomerol)
- Fix for newly created Worldmap panels overflowing their boundaries.
- Fix for legend css
- Turned off mouse wheel zoom

## v0.0.20

Small fixes.

## v0.0.19

Fix for Elasticsearch geohash maps after breaking change in Grafana 4.5.

## v0.0.18

- Fixes some coordinates in the country location data.
- Last Geohash as center for the map - it centers the map on the last geohash position received. Useful for real time tracking (with auto refresh on in Grafana).

## v.0.0.17

- Adds Country data with 3-letter country codes.

## v.0.0.16

- Option for sticky labels. Fix for https://github.com/grafana/worldmap-panel/issues/27

- Ability to hide null or 0 values. Fix for https://github.com/grafana/worldmap-panel/issues/13

- Background color change. Fixes https://github.com/grafana/worldmap-panel/issues/36

- Dynamic thresholds implemented by [Sam Hatchett](https://github.com/samhatchett). Can now have more than 2 threshold values. Thanks! Fixes https://github.com/grafana/worldmap-panel/issues/25

- Validation and default values for option fields. Fixes https://github.com/grafana/worldmap-panel/issues/29

## v.0.0.15

- Fix for change in Grafana that [breaks Worldmap panels using Geohash or Table Data](https://github.com/grafana/worldmap-panel/issues/45).

## v.0.0.14

- Various [bug](https://github.com/grafana/worldmap-panel/pull/31) [fixes](https://github.com/grafana/worldmap-panel/pull/32) provided by [linkslice](https://github.com/linkslice) (Thank you!)

## v.0.0.13

- New location data option -> table data. Location data can now come from data sources other than graphite and Elasticsearch (InfluxDb for example). See table data instructions above on how to use it.

## v.0.0.12

- Fixes [issue with the JSON endpoint not working](https://github.com/grafana/worldmap-panel/issues/22)

## v.0.0.11

- Zoom issue fix and adds a states options for USA states location data.

## v.0.0.10

- Performance fix for snapshotting. Sets maxdatapoints to 1 to minimize data that needs to be saved in the snapshot.

## v.0.0.9

- Fixes bug that meant location data did not refresh after being changed in the editor. It required the page to be refreshed to reload it.

## v.0.0.8

- Saves location data in the dashboard json when snapshotting. This means snapshots should work even when using a custom endpoint for returning a location data json file.

## v.0.0.7

- Updates tile map urls to https to avoid mixed content warnings on https sites.

## v.0.0.6

- Adds decimal places option for data values in circle popovers.

## v.0.0.5

- Adds support for json and jsonp endpoints for location data.

## v0.0.4

- Fixes snapshotting.

## v0.0.3

- Support for lowercase country codes for non-elasticsearch datasources.

## v0.0.2

- Fixes bug where time series with a country code not found in the country data crashes the panel.
- Adds some extra country codes to the country data to be more similar to the MaxMind Country database.

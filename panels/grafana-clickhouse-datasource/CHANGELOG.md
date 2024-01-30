# Changelog

## 3.3.0

### Features
- Support Point geo data type.

### Fixes
- Fix timeInterval_ms macro.
- Fix Table summary and Parts over time panels in Data Analysis dashboard.

### Upgrades
- Upgrade [grafana-plugin-sdk-go](https://github.com/grafana/grafana-plugin-sdk-go).

## 3.2.0

### Features
- Add `timeInterval_ms` macro to allow higher precision queries on DateTime64 columns. [#462](https://github.com/grafana/clickhouse-datasource/pull/462).

### Fixes
- Ensure databases, tables, and columns are escaped correctly. [#460](https://github.com/grafana/clickhouse-datasource/pull/460).
- Fix conditionAll handling. [#459](https://github.com/grafana/clickhouse-datasource/pull/459).
- Fix support for ad-hoc regexp filters: `=~`, `!~` [#414](https://github.com/grafana/clickhouse-datasource/pull/414).
- Do not create malformed adhoc filters [#451](https://github.com/grafana/clickhouse-datasource/pull/451). invalid values will be ignored.
- Fix auto formatting by reverting to table correctly. [#469](https://github.com/grafana/clickhouse-datasource/pull/469).
- Fix parsing of numeric configuration values in `yaml` file. [#456](https://github.com/grafana/clickhouse-datasource/pull/456).

## 3.1.0

- Stable release of v3.0.4-beta

## 3.0.4-beta

- Update Grafana dependencies to >=v9.0.0
- **Feature** - [Add support for the secure socks proxy](https://github.com/grafana/clickhouse-datasource/pull/389)

## 3.0.3-beta

- Update ClickHouse driver to v2.9.2

## 3.0.2-beta

- Custom ClickHouse settings can be set in data source settings. [Allow passing custom ClickHouse settings in datasource](https://github.com/grafana/clickhouse-datasource/pull/366)
- Histogram UI fixes [Histogram UI fixes](https://github.com/grafana/clickhouse-datasource/pull/363)
  -  Support filter/filter out logs view actions
  -  Fix undefined database name by default
  -  Reset level and time field properly on table/database change
  -  Make it possible to clear the level field (so the histogram will render without grouping by level)
  -  Fix filter value that gets stuck in the UI
- Tracing dashboard added to default dashboards. [Tracing dashboard ](https://github.com/grafana/clickhouse-datasource/pull/336)

## 3.0.1-beta

- Users on v8.x of Grafana are encouraged to continue to use v2.2.0 of the plugin. 
- Users of Grafana v9.x can use v3 however it is beta and may contain bugs.

## 3.0.0
- **Feature** - [Logs volume histogram support](https://github.com/grafana/clickhouse-datasource/pull/352)
- **Chore** - Update clickhouse-go to v2.8.1

## 2.2.1

- **Chore** - Backend binaries compiled with latest go version 1.20.4
- Custom ClickHouse settings can be set in data source settings. Allow passing custom [ClickHouse settings in datasource](https://github.com/grafana/clickhouse-datasource/pull/371)
- Standard Golang HTTP proxy environment variables support (`HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY`). See [FromEnvironment](https://pkg.go.dev/golang.org/x/net/http/httpproxy#FromEnvironment) for more information. If the Grafana instance is started with one of these env variables, the driver will automatically load them now.

## 2.2.0

- **Feature** - [Support format dropdown and support for rendering traces](https://github.com/grafana/clickhouse-datasource/pull/329)

## 2.1.1

- **Fix** - [Date and Date32 type normalization with user's timezone](https://github.com/grafana/clickhouse-datasource/pull/314)

## 2.1.0

- **Fix** - Quote table names with dots by @slvrtrn in https://github.com/grafana/clickhouse-datasource/pull/298
- Add a predefined TimeRange filter if there is at least one DateTime* column by @slvrtrn in https://github.com/grafana/clickhouse-datasource/pull/304

## 2.0.7

- **Fix** - Empty template variables used with the conditionalAll macro work the same as selecting All. [Allow empty Inputs for $__conditionalAll](https://github.com/grafana/clickhouse-datasource/issues/262)
- **Fix** - Intervals are limited to 1 second. [limit $__interval_s to at least 1 second](https://github.com/grafana/clickhouse-datasource/pull/270)
- **Chore** - Bump ClickHouse go API to v2.5.1 [Bump github.com/ClickHouse/clickhouse-go/v2 from 2.4.3 to 2.5.1](https://github.com/grafana/clickhouse-datasource/pull/283)

## 2.0.6

- **Chore** - Backend binaries compiled with latest go version 1.19.4
- **Chore** - Backend grafana dependencies updated to latest version
- **Chore** - Clickhouse-go client updated to [v2.4.3](https://github.com/ClickHouse/clickhouse-go/blob/main/CHANGELOG.md#243-2022-11-30)

## 2.0.5

- **Chore** - Update sqlds to 2.3.17 which fixes complex macro queries
- **Chore** - Backend grafana dependency updated
- **Fix** - Allow default protocol toggle value when saving in settings

## 2.0.4

- **Fix** - Query builder: allow custom filter values for fields with [`Map`](https://clickhouse.com/docs/en/sql-reference/data-types/map/) type

## 2.0.3

- **Chore** - Backend binaries compiled with latest go version 1.19.3
- **Chore** - Backend grafana dependencies updated

## 2.0.2

- **Feature** - Update sqlds to 2.3.13 which fixes some macro queries

## 2.0.1

- **Bug** - Now works with Safari. Safari does not support regex look aheads

## 2.0.0

- **Feature** - Upgrade driver to support HTTP
- **Feature** - Changed how ad hoc filters work with a settings option provided in CH 22.7
- **Feature** - Conditional alls are now handled with a conditional all function. The function checks if the second parameter is a template var set to all, if it then replaces the function with 1=1, and if not set the function to the first parameter.
- **Bug** - Visual query builder can use any date type for time field
- **Fix** - 'any' is now an aggregation type in the visual query builder
- **Fix** - Time filter macros can be used in the adhoc query
- **Bug** - Time interval macro cannot have an interval of 0
- **Fix** - Update drive to v2.1.0
- **Bug** - Expand query button works with grafana 8.0+
- **Fix** - Added adhoc columns macro

## 1.1.2

- **Bug** - Add timerange to metricFindQuery

## 1.1.1

- **Bug** - Add timeout

## 1.1.0

- **Feature** - Add convention for showing logs panel in Explore

## 1.0.0

- Official release

## 0.12.7

- **Fix** - Ignore template vars when validating sql

## 0.12.6

- **Fix** - Time series builder - use time alias when grouping/ordering

## 0.12.5

- **Chore** - Dashboards

## 0.12.4

- **Fix** - timeseries where clause. make default db the default in visual editor

## 0.12.3

- **Fix** - When removing conditional all, check scoped vars (support repeating panels)

## 0.12.2

- **Fix** - When removing conditional all, only remove lines with variables

## 0.12.1

- **Fix** - Handle large decimals properly

## 0.12.0

- **Feature** - Time series builder: use $__timeInterval macro on time field so buckets can be adjusted from query options.

## 0.11.0

- **Feature** - Time series: Hide fields, use group by in select, use time field in group by

## 0.10.0

- **Feature** - Ad-Hoc sourced by database or table

## 0.9.13

- **Fix** - Update sdk to show streaming errors

## 0.9.12

- **Fix** - Format check after ast change

## 0.9.11

- **Feature** - $__timeInterval(column) and $__interval_s macros

## 0.9.10

- **Fix** - Set format when using the new Run Query button.

## 0.9.9

- **Feature** - Query Builder.

## 0.9.8

- **Fix** - Detect Multi-line time series. Handle cases with functions.

## 0.9.7

- **Feature** - Multi-line time series.

## 0.9.6

- **Bug** - Change time template variable names.

## 0.9.5

- **Bug** - Fix global template variables.

## 0.9.4

- **Bug** - Fix query type variables.

## 0.9.3

- **Bug** - Support Array data types.

## 0.9.2

- **Bug** - Fix TLS model.

## 0.9.1

- **Feature** - Add secure toggle to config editor.

## 0.9.0

- Initial Beta release.

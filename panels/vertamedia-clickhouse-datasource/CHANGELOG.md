# 2.1.0 (2020-08-13)

## Enhancement:
* add "Skip comments" checkbox to query editor to pass SQL comments to server, fix https://github.com/Vertamedia/clickhouse-grafana/issues/265
* add setup notes for Grafana 7.x to README
* add SQL preprocessing logic on browser side with <% js code subset %>, https://github.com/Vertamedia/clickhouse-grafana/pull/186, thanks @fgbogdan
* improve alerts query processing for use case when `query(query_name, from, to)` time range is less than visible dashboard time range, see https://github.com/Vertamedia/clickhouse-grafana/issues/237
* improve alerts json parsing in golang part for case when we have string fields in response which interprets as series name, see https://github.com/Vertamedia/clickhouse-grafana/issues/230
* properly parsing POST queries in golang part of plugin, https://github.com/Vertamedia/clickhouse-grafana/pull/228, thanks @it1804

## Fixes:
* fix corner cases for $macro + subquery, see https://github.com/Vertamedia/clickhouse-grafana/issues/276 and https://github.com/Vertamedia/clickhouse-grafana/issues/277  
* fix parallel query execution, see https://github.com/Vertamedia/clickhouse-grafana/pull/273
* fix identifiers quotes, see https://github.com/Vertamedia/clickhouse-grafana/issues/276, https://github.com/Vertamedia/clickhouse-grafana/issues/277
* fix plugin.json for pass `grafana-plugin-repository` plugin validator
* fix multi-value variables behavior - https://github.com/Vertamedia/clickhouse-grafana/issues/252
* add Vagrantfile for statefull environment and allow to upgrade scenario like  grafana 7.1.0 + grafana-cli upgrade-all
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/244
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/243
* add multiple dashboard examples for github issues:
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/240 
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/135 
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/245 
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/238   
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/232
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/127
  * fix https://github.com/Vertamedia/clickhouse-grafana/issues/141
  
# 2.0.2 (2020-07-06)

## Enhancements:
* add alerts support for Windows and MacOSX
* improve ad-hoc filters for query field values as `SELECT DISTINCT field AS value FROM db.table LIMIT 300`, https://github.com/Vertamedia/clickhouse-grafana/pull/222
* add ability to multiple JOIN parsing https://github.com/Vertamedia/clickhouse-grafana/pull/206 
* multiple improvements for docker-compose environments, add automatic dashboards and datasource provisions which help to reproduce most of the corner cases which happens in Grafana + ClickHouse

## Fixes:
* apply a workaround for UTC timezone for Date and DateTime columns in grafana dashboards https://github.com/Vertamedia/clickhouse-grafana/issues/117
* clear documentation about timestamp term for $from and $to https://github.com/Vertamedia/clickhouse-grafana/issues/115
* fix AST parsing corner case in `WHERE [test, 'test']` "," was skipped, fix ah-doc ast FROM recursive parsing https://github.com/Vertamedia/clickhouse-grafana/issues/99
* fix corner cases for table functions parsing when adhoc filter applied https://github.com/Vertamedia/clickhouse-grafana/issues/130
* fix multiple grammar issues in README.md
* fix convert rules for Float, Decimal columns from Clickhouse to Grafana Table plugin https://github.com/Vertamedia/clickhouse-grafana/issues/199 
* fix corner cases when Grafana Template variable value represented as array of strings https://github.com/Vertamedia/clickhouse-grafana/issues/169
* fix AST parsing corner cases for $macroFunctions correct position for FROM statement https://github.com/Vertamedia/clickhouse-grafana/issues/187
  
# 2.0.1 (2020-06-19)

## Fixes:
* fix golang alerts for $columns, $perSecond, $perSecondColumns macros https://github.com/Vertamedia/clickhouse-grafana/pull/200

# 2.0.0 (2020-06-17)

## Enhancements:
* compatibility with grafana 7.x, please use environment variable `GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=vertamedia-clickhouse-datasource` or `allow_loading_unsigned_plugins=vertamedia-clickhouse-datasource` in plugins section of `grafana.ini` https://github.com/Vertamedia/clickhouse-grafana/pull/192 
* add grafana 7.x alerting support thanks to Brian Thai https://github.com/bmanth60 
* add alias support to $perSecondColumns macro https://github.com/Vertamedia/clickhouse-grafana/pull/193
* Support `custom` variable type and empty values for `$conditionalTest` macro https://github.com/Vertamedia/clickhouse-grafana/pull/178
* add docker-compose.yaml to improve local development

## Fixes:
* fix AST for corner case when quotes escaped inside quotes https://github.com/Vertamedia/clickhouse-grafana/pull/123, https://github.com/Vertamedia/clickhouse-grafana/pull/195
* fix https://github.com/Vertamedia/clickhouse-grafana/issues/179,  add "Extrapolation" checkbox to Query Editor 

# 1.9.5 (2020-01-15)

## Fixes:
* Comments not supported by sql language parser #95 

# 1.9.4 (2019-11-27)

## Fixes:
* Ad Hoc Filters small adjustments for numeric values
* UI optimizations within Metric builder 

# 1.9.3 (2019-10-18)

## Fixes:
* Ad Hoc Filters improvements for complex usage

# 1.9.2 (2019-10-10)

## Fixes:
* Compatibility fix to support grafana 6.4.x
* Ad Hoc Filters fix
* $conditionalTest ALL value option fix


# 1.9.0 (2019-08-12)

## New features:

* Add macro `conditionalTest` (thx to @TH-HA) #122
* Add support for connect to Yandex.Cloud ClickHouse (thx to @negasus) #106

## Fixes:

* Fix identifier back quoting when there is a function call
* Fix AST parser errors for quotes (thx to @Fiery-Fenix) #128 
* Added default database to all requests from datasource options (thx to @Fiery-Fenix) #126
* Drop lodash fcn composition (thx to @simPod) #110
* Cleanup build (thx to @simPod) #112


# 1.8.1 (2019-02-01)

## New features:

* Add `timeFilterByColumn` macro (thx to @simPod) #68

## Fixes:

* add requestId to queries so that abandoned one are cancelled (thx to @nvartolomei)
* bug with parentheses in `$unescape` macros #90
* bug with treating string as numbers in table view #97


# 1.8.0 (2018-11-07)

## New features

* new $perSecond and $perSecondColumns macros (thx to @simPod) #78 #80
* Date column is now optional #48

## Fixes:

* extend queried timerange for queries with round option to provide a graph without gaps in the rightmost and leftmost points #84
* adhocs: check whether it is possibly to apply filters by comparing with parsed query or query builder settings #86


# 1.7.0 (2018-09-05)

## New Features

* provide $adhoc macros for using ad-hoc filters in inner queries (thx to @vavrusa)
* allow to set custom query for ad-hoc filter via `adhoc_query_filter` variable
* provide new `Round` value `$step` for auto-rounding according to graph resolution changes


# 1.6.0 (2018-08-07)

## New Features

* annotations support (txh to @atsirin)
* allow to use `$from` and `$to` macroses in variable queries
* provisioning config example in README


# 1.5.1 (2018-06-05)

## Fixes

* optimize memory use for range time series (thx to @vavrusa)
* apply ad-hoc filters on inner subqueries (thx to @vavrusa)


# 1.5.0 (2018-05-31)

## New Features

* new datasource setting - `default database`. If set it will be prefilled in the query builder, and used to make ad-hoc filters more convenient (thx to @vavrusa)
* support wildcard ad-hoc filters for dashboards using multiple tables (thx to @vavrusa)
* parse dimensions from GROUP BY to simplify querying (see [piechart](https://github.com/Vertamedia/clickhouse-grafana#piechart-httpsgrafanacompluginsgrafana-piechart-panel) and [worldmap](https://github.com/Vertamedia/clickhouse-grafana#worldmap-panel-httpsgithubcomgrafanaworldmap-panel) examples) (thx to @vavrusa)
* `$timeCol` to `$dateCol` renamed to be more clear with column types (thx to @simPod)


# 1.4.3 (2018-04-09)

## Fixes

* fix broken AST when using nested `SELECT` without `FROM` statement (#45)
* strict statement matching (#44)
* rebuild queries from AST only if adhoc filters were applied


# 1.4.2 (2018-03-18)

## Fixes

* support `UNION ALL` statements
* proper format for `LIMIT N,M` construction (thx to @shankerwangmiao)
* update `Show Help` section with $unescape description


# 1.4.1 (2018-03-12)

## New Features

* $unescape - unescapes variable value by removing single quotes. Used for multiple-value string variables: "SELECT $unescape($column) FROM requests WHERE $unescape($column) = 5"

## Fixes

* labmda-operator `->` no more breaks while reformatting query


# 1.4.0 (2018-03-08)

## New Features

Ad-hoc filters support:
* If there is an Ad-hoc variable, plugin will fetch all columns of all tables of all databases (except system database) as tags.
So in dropdown menu will be options like `database.table.column`
* If there are ENUM columns, plugin will fetch their options and use them as tag values
* Plugin will apply Ad-hoc filters to all queries on the dashboard if their settings `$database` and `$table` are the same
as Ad-hoc's `database.table`
* There are no option to apply OR operator for multiple Ad-hoc filters - see grafana/grafana#10918
* There are no option to use IN operator for Ad-hoc filters due to Grafana limitations

# 1.3.1 (2018-02-12)

## Fixes

* support array indexing int AST


# 1.3.0 (2018-02-07)

## New Features
* columns autocompletion in ace-editor

# 1.2.7 (2018-01-05)

## Fixes

* properly format query with reserved names
* fix #31


# 1.2.6 (2017-12-13)

## Fixes
* allow rounding with `round` option both time filters: $from and $to


# 1.2.5 (2017-12-05)

## Fixes
* support template variables with different `text` and `value` values [#27](https://github.com/Vertamedia/clickhouse-grafana/issues/27)
* fix visual glitches [#29](https://github.com/Vertamedia/clickhouse-grafana/issues/29)


# 1.2.4 (2017-11-22)

## Fixes
* apply proper value formatting for table format


# 1.2.3 (2017-11-20)

## Fixes
* commit generated files


# 1.2.2 (2017-11-20)

## Fixes
* fix error with absent `getCollapsedText` [#24](https://github.com/Vertamedia/clickhouse-grafana/issues/24)
* suppress errors while parsing AST [#24](https://github.com/Vertamedia/clickhouse-grafana/issues/24)
* show generated SQL in textarea [#24](https://github.com/Vertamedia/clickhouse-grafana/issues/24)
* do not round timestamp after converting [#25](https://github.com/Vertamedia/clickhouse-grafana/issues/25)
* increase max-height of query editor


# 1.2.1 (2017-11-17)

## Fixes
* add forgotten completions
* process NULL values [#19](https://github.com/Vertamedia/clickhouse-grafana/issues/19)
* sort by key value in `$columns` macro [#16](https://github.com/Vertamedia/clickhouse-grafana/issues/16)


# 1.2.0 (2017-11-15)

## New Features
* Ace editor
* ClickHouse function completion (thx to https://github.com/smi2/tabix.ui)


# 1.1.0 (2017-11-13)

## New Features
* Allow `UInt32` as Timestamp column [#15](https://github.com/Vertamedia/clickhouse-grafana/issues/15)
* Add `Format as Table` format [#17](https://github.com/Vertamedia/clickhouse-grafana/issues/17)

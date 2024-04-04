# Change Log

## Entries

## v2.1.5

- Fixes rendering of composites when template variables changes
- Refactor/Cleanup code, slightly more efficient

## v2.1.4

- Fix tooltips being displayed from wrong panel [#314](https://github.com/grafana/grafana-polystat-panel/issues/314) [#315](https://github.com/grafana/grafana-polystat-panel/issues/315)
- Fix ellipses showing when they are not needed [#322](https://github.com/grafana/grafana-polystat-panel/issues/322)
- Fix alignment based on shape [#322](https://github.com/grafana/grafana-polystat-panel/issues/322)
  - When autoSizeRows or autoSizeColumns are disabled, the placement will be centered based on actual number of polygons rendered
- NEW: Clickthrough target can be customized, allowing better behavior in Scene-based apps. [#316](https://github.com/grafana/grafana-polystat-panel/issues/316).  Set "open in new tab" to off to use this new setting.

## v2.1.3

- Bump to Node 18
- Update package
- Fix for SQL result processing [[#309](https://github.com/grafana/grafana-polystat-panel/issues/309)] and [#269](https://github.com/grafana/grafana-polystat-panel/issues/269)
- Fix for tooltip crashing [#307](https://github.com/grafana/grafana-polystat-panel/issues/307)
- NEW: Global Regex Aliasing for composites [#301](https://github.com/grafana/grafana-polystat-panel/pull/301)

## v2.1.2

- Allow display limit of 0 for unlimited polygons [#298](https://github.com/grafana/grafana-polystat-panel/issues/298)

## v2.1.1

- Fixes display limit bug [#255](https://github.com/grafana/grafana-polystat-panel/issues/255)
- Fixes performance issues with G10 [#294](https://github.com/grafana/grafana-polystat-panel/issues/294)

## v2.1.0

- Fixes tooltips being left behind when mousing out of panel in G10
- Switched to react-tooltips vs tippyjs and leveraging UI Portal component
- Performance improved due to dynamic generation of tooltips vs pre-creation
- Tooltip now follows theme

## v2.0.9

- Fixes multi-select templated composite bug
- Enhances metric hints for composites and overrides to cover more dataframe options

## v2.0.8

- Adds support for additional metric hints depending on the structure of the frames received.

## v2.0.7

- Fixes metric hint errors when using overrides and composites

## v2.0.6

- Add Font Selector for rendered text. The new default is Inter, and migrations will auto-switch to this new font.
  - Additional fonts are available, and the auto-scalar will adjust for differences
  - Tooltips also can have separate fonts
- Adds option to toggle tooltip columns (Issue #259), PR #260

## v2.0.5

- Fix for Issue #249, bug in migrations when upgrading plugin
- Fix for Issue #256, global override editor displays wrong column
- Fix for low-risk XSS in composite animations

## v2.0.4

- Fix for Issue #242 (wide data conversion)
    Some datasources will send non-timeseries dataframes that are "wide" and the conversion to the polystat model did not handle this scenario.
    This is seen with CSV Content and other datasources.  This fix will detect wide data received in this format and convert as expected.
- Fix for Issue #247 (composite template variables)
    Advanced use of template variables in composites were not functioning as intended. Composites can once again use template variables as the composite name, and reference the composite name inside the list of member metrics.
- Metric Hints in composites and overrides are now displaying correctly
- Override Editor buttons are now left aligned for easier access and visibility
- Composite Editor buttons are also left aligned, and are now visible
- Composite Editor metrics should be easier to see and alias

## v2.0.3

- Fix for Issue #241 (Global Threshold Migration)

## v2.0.2

- Fix for issue #240
  - Global regex will now correctly modify the display name
  - Using transformations for metric data also works (Rename by regex and others)

## v2.0.1

- Fixes ability to use template variables inside composite names
- Fixes hide/show composite member metrics when they overlap in multiple composites

## v2.0.0

- Plugin has been converted to React
- Existing panels will auto-migrate to the new config schema
- Feature parity with v1.2.11, including bug fixes
- Documentation re-written to reflect the change to editors
- Advanced examples are provided

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

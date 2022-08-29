
#### Changelog


##### v0.1.1

- Added MANIFEST


##### v0.1.0

- works with Grafana 7 (naming fixed)
- Building with `@grafana/toolkit`
- Supports DataFrame directly for 6.4+


##### v0.0.9

- Remove `dist` from master
- Use webpack build
- FIX: Use background color to clear the background
- Configurable duration resolution option (thanks @clink-aaron)
- deploy using release-it
- Don't hide series names on hover

##### v0.0.8

- Support Snapshots (thanks @londonanthonyoleary)
- Direct link rendered image now works.
- Support UTC date display
- Fix display issue with 5.1
- Merge distinct values in legend unless showing the name
- Basic Annotation Support
- Fix mapping numeric data to text

##### v0.0.7

- Switch to typescript
- Override applyPanelTimeOverrides rather than issueQueries to extend time
- Support numeric unit conversion
- New rendering pipeline (thanks @jonyrock)
- Don't detect duplicate colors from metrics
- Formatting with prettier.js
- Only hide hover text when it collides
- Show time axis (copied from novatec-grafana-discrete-panel)
- Improved text collision behavior

##### v0.0.6

- Fix for grafana 4.5 (thanks @alin-amana)

##### v0.0.5

- Support results from the table format
- Support results in ascending or decending order
- Configure legend percentage decimal points
- Legend can show transition count and distinct value count
- Clamp percentage stats within the query time window
- Changed the grafana dependency version to 4.x.x, since 3.x.x was not really supported
- Fixed issues with tooltip hover position
- Option to expand 'from' query so the inital state can avoid 'null'

##### v0.0.4

- Support shared tooltips (not just crosshair)

##### v0.0.3

- Configure more colors (retzkek)
- Fix tooltips (retzkek)
- Configure Text Size
- Support shared crosshair

##### v0.0.2

- Use the panel time shift.

##### v0.0.1

- First working version

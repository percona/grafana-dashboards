# Breadcrumb Panel Plugin for Grafana
This is a panel plugin for [Grafana](http://grafana.org/). It keeps track of dashboards you have visited within one session
and displays them as a breadcrumb. Each dashboard is added only once to the breadcrumb. You can navigate back to some
dashboard in breadcrumb by clicking the dashboard name link text. When navigation back all items coming after the selected
dashboard will be removed from the breadcrumb. Note that breadcrumb can track only dashboards that have breadcrumb panel on them.

To understand what is a plugin, read the [Grafana's documentation about plugins](http://docs.grafana.org/plugins/development/).

## Options
Is root dashboard - Panel has an option for setting it as the root. If set, this will clear breadcrumb in root dashboard.
Hide text in root dashboard - Don't show anything if breadcrumb has only one item
Limit the amount of breadcrumb items to - The amount of breadcrumb items is limited by default. The oldest item is removed when exceeded.

### Features
* [Angular.js (1.0)](https://angularjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Sass](http://sass-lang.com/)

### Compiling
```
npm install
grunt
```
The compiled product is in ``dist`` folder.

### Deployment
Copy the contents of ``dist`` folder to ``plugins/breadcrumb`` folder so Grafana will find the plugin and it can be used in Grafana dashboards.

### Install the Panel
Use the grafana-cli tool to install Breadcrumb from the commandline:
```
grafana-cli plugins install digiapulssi-breadcrumb-panel
```
The plugin will be installed into your grafana plugins directory; the default is /var/lib/grafana/plugins.

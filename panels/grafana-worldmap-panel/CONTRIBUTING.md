# Building WorldMap

The easiest way to get started is to git clone the WorldMap project directly into the `data/plugins` folder in the Grafana source. (A git repo inside of a git repo)

1. Install npm packages: `npm install`
2. Build and lint the JavaScript: `npm run build`
2. Run the tests before submitting a PR: `npm run test`
3. A test watcher when TDD:ing: `npm run test:watch`

Grafana will read in the dist folder first so to see your changes to WorldMap in Grafana, you have to run Grunt. However, you do not need to restart your local Grafana server after every change; just refresh the page.

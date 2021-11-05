import { MetricsPanelCtrl } from "grafana/app/plugins/sdk";
import TimeSeries from "grafana/app/core/time_series2";
import appEvents from 'grafana/app/core/app_events';

import * as _ from "lodash";
import DataFormatter from "./data_formatter";
import "./css/worldmap-panel.css";
import $ from "jquery";
import "./css/leaflet.css";
import WorldMap from "./worldmap";

const panelDefaults = {
  maxDataPoints: 1,
  mapCenter: "(0°, 0°)",
  mapCenterLatitude: 0,
  mapCenterLongitude: 0,
  initialZoom: 1,
  valueName: "total",
  circleMinSize: 2,
  circleMaxSize: 30,
  locationData: "countries",
  thresholds: "0,10",
  colors: [
    "rgba(245, 54, 54, 0.9)",
    "rgba(237, 129, 40, 0.89)",
    "rgba(50, 172, 45, 0.97)"
  ],
  unitSingle: "",
  unitPlural: "",
  showLegend: true,
  mouseWheelZoom: false,
  esMetric: "Count",
  decimals: 0,
  hideEmpty: false,
  hideZero: false,
  stickyLabels: false,
  tableQueryOptions: {
    queryType: "geohash",
    geohashField: "geohash",
    latitudeField: "latitude",
    longitudeField: "longitude",
    metricField: "metric"
  }
};

const mapCenters = {
  "(0°, 0°)": { mapCenterLatitude: 0, mapCenterLongitude: 0 },
  "North America": { mapCenterLatitude: 40, mapCenterLongitude: -100 },
  Europe: { mapCenterLatitude: 46, mapCenterLongitude: 14 },
  "West Asia": { mapCenterLatitude: 26, mapCenterLongitude: 53 },
  "SE Asia": { mapCenterLatitude: 10, mapCenterLongitude: 106 },
  "Last GeoHash": { mapCenterLatitude: 0, mapCenterLongitude: 0 }
};

export default class WorldmapCtrl extends MetricsPanelCtrl {
  static templateUrl = "partials/module.html";

  dataFormatter: DataFormatter;
  locations: any;
  tileServer: string;
  saturationClass: string;
  map: any;
  series: any;
  data: any;
  mapCenterMoved: boolean;

  /** @ngInject **/
  constructor($scope, $injector, contextSrv) {
    super($scope, $injector);

    this.setMapProvider(contextSrv);
    _.defaults(this.panel, panelDefaults);

    this.dataFormatter = new DataFormatter(this);

    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("panel-teardown", this.onPanelTeardown.bind(this));
    this.events.on("data-snapshot-load", this.onDataSnapshotLoad.bind(this));

    this.loadLocationDataFromFile();
  }

  setMapProvider(contextSrv) {
    this.tileServer = contextSrv.user.lightTheme
      ? "CartoDB Positron"
      : "CartoDB Dark";
    this.setMapSaturationClass();
  }

  setMapSaturationClass() {
    if (this.tileServer === "CartoDB Dark") {
      this.saturationClass = "map-darken";
    } else {
      this.saturationClass = "";
    }
  }

  loadLocationDataFromFile(reload?) {
    if (this.map && !reload) {
      return;
    }

    if (this.panel.snapshotLocationData) {
      this.locations = this.panel.snapshotLocationData;
      return;
    }

    if (this.panel.locationData === "jsonp endpoint") {
      if (!this.panel.jsonpUrl || !this.panel.jsonpCallback) {
        return;
      }

      $.ajax({
        type: "GET",
        url: this.panel.jsonpUrl + "?callback=?",
        contentType: "application/json",
        jsonpCallback: this.panel.jsonpCallback,
        dataType: "jsonp",
        success: res => {
          this.locations = res;
          this.render();
        }
      });
    } else if (this.panel.locationData === "json endpoint") {
      if (!this.panel.jsonUrl) {
        return;
      }

      $.getJSON(this.panel.jsonUrl).then(res => {
        this.locations = res;
        this.render();
      });
    } else if (this.panel.locationData === "table") {
      // .. Do nothing
    } else if (
      this.panel.locationData !== "geohash" &&
      this.panel.locationData !== "json result"
    ) {
      $.getJSON(
        "public/plugins/grafana-worldmap-panel/data/" +
          this.panel.locationData +
          ".json"
      ).then(this.reloadLocations.bind(this));
    }
  }

  reloadLocations(res) {
    this.locations = res;
    this.refresh();
  }

  showTableGeohashOptions() {
    return (
      this.panel.locationData === "table" &&
      this.panel.tableQueryOptions.queryType === "geohash"
    );
  }

  showTableCoordinateOptions() {
    return (
      this.panel.locationData === "table" &&
      this.panel.tableQueryOptions.queryType === "coordinates"
    );
  }

  onPanelTeardown() {
    if (this.map) {
      this.map.remove();
    }
  }

  onInitEditMode() {
    this.addEditorTab(
      "Worldmap",
      "public/plugins/grafana-worldmap-panel/partials/editor.html",
      2
    );
  }

  onDataReceived(dataList) {
    if (!dataList) {
      return;
    }

    try {
      if (this.dashboard.snapshot && this.locations) {
        this.panel.snapshotLocationData = this.locations;
      }

      const data = [];

      if (this.panel.locationData === "geohash") {
        this.dataFormatter.setGeohashValues(dataList, data);
      } else if (this.panel.locationData === "table") {
        const tableData = dataList.map(DataFormatter.tableHandler.bind(this));
        this.dataFormatter.setTableValues(tableData, data);
      } else if (this.panel.locationData === "json result") {
        this.series = dataList;
        this.dataFormatter.setJsonValues(data);
      } else {
        this.series = dataList.map(this.seriesHandler.bind(this));
        this.dataFormatter.setValues(data);
      }
      this.data = data;

      this.updateThresholdData();

      if (this.data.length && this.panel.mapCenter === "Last GeoHash") {
        this.centerOnLastGeoHash();
      } else {
        this.render();
      }
    } catch (err) {
      appEvents.emit('alert-error', ['Data error', err.toString()])
    }
  }

  centerOnLastGeoHash() {
    const last: any = _.last(this.data);
    mapCenters[this.panel.mapCenter].mapCenterLatitude = last.locationLatitude;
    mapCenters[this.panel.mapCenter].mapCenterLongitude =
      last.locationLongitude;
    this.setNewMapCenter();
  }

  onDataSnapshotLoad(snapshotData) {
    this.onDataReceived(snapshotData);
  }

  seriesHandler(seriesData) {
    const series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }

  setNewMapCenter() {
    if (this.panel.mapCenter !== "custom") {
      this.panel.mapCenterLatitude =
        mapCenters[this.panel.mapCenter].mapCenterLatitude;
      this.panel.mapCenterLongitude =
        mapCenters[this.panel.mapCenter].mapCenterLongitude;
    }
    this.mapCenterMoved = true;
    this.render();
  }

  setZoom() {
    this.map.setZoom(this.panel.initialZoom || 1);
  }

  toggleLegend() {
    if (!this.panel.showLegend) {
      this.map.removeLegend();
    }
    this.render();
  }

  toggleMouseWheelZoom() {
    this.map.setMouseWheelZoom();
    this.render();
  }

  toggleStickyLabels() {
    this.map.clearCircles();
    this.render();
  }

  changeThresholds() {
    this.updateThresholdData();
    this.map.legend.update();
    this.render();
  }

  updateThresholdData() {
    this.data.thresholds = this.panel.thresholds.split(",").map(strValue => {
      return Number(strValue.trim());
    });
    while (_.size(this.panel.colors) > _.size(this.data.thresholds) + 1) {
      // too many colors. remove the last one.
      this.panel.colors.pop();
    }
    while (_.size(this.panel.colors) < _.size(this.data.thresholds) + 1) {
      // not enough colors. add one.
      const newColor = "rgba(50, 172, 45, 0.97)";
      this.panel.colors.push(newColor);
    }
  }

  changeLocationData() {
    this.loadLocationDataFromFile(true);

    if (this.panel.locationData === "geohash") {
      this.render();
    }
  }

  link(scope, elem, attrs, ctrl) {
    let firstRender = true;

    ctrl.events.on("render", () => {
      render();
      ctrl.renderingCompleted();
    });

     function render() {
      if (!ctrl.data) {
        return;
      }

      // delay first render as the map panel sizing is bugged first render even though the element has correct height
      if (firstRender) {
        firstRender = false;
        setTimeout(render, 100);
        return;
      }

      const mapContainer = elem.find(".mapcontainer");

      if (mapContainer[0].id.indexOf("{{") > -1) {
        return;
      }

      if (!ctrl.map) {
        const map = new WorldMap(ctrl, mapContainer[0]);
        map.createMap();
        ctrl.map = map;
      }

      ctrl.map.resize();

      if (ctrl.mapCenterMoved) {
        ctrl.map.panToMapCenter();
      }

      if (!ctrl.map.legend && ctrl.panel.showLegend) {
        ctrl.map.createLegend();
      }

      ctrl.map.drawCircles();
    }
  }
}

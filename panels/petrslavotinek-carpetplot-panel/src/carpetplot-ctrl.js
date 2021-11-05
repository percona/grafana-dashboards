import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';

import createConverter from './data-converter';
import aggregates, { aggregatesMap } from './aggregates';
import fragments, { fragmentsMap } from './fragments';
import colorModes, { colorModesMap } from './color-modes';
import colorSpaces, { colorSpacesMap } from './color-spaces';
import { labelFormats } from './x-axis-label-formats';
import canvasRendering from './canvas/rendering';
import { carpetplotDisplayEditor } from './display-editor';
import { carpetplotAxesEditor } from './axes-editor';
import themeProvider from './theme-provider';
import './css/carpet-plot.css!';

const panelDefaults = {
  aggregate: aggregates.AVG,
  fragment: fragments.HOUR,
  color: {
    mode: colorModes.SPECTRUM,
    colorScheme: 'interpolateRdYlGn',
    nullColor: 'transparent',
    customColors: [{
      color: '#006837'
    }, {
      color: '#aa0526'
    }],
    colorSpace: colorSpaces.RGB
  },
  scale: {
    min: null,
    max: null
  },
  xAxis: {
    show: true,
    showWeekends: true,
    minBucketWidthToShowWeekends: 4,
    showCrosshair: true,
    labelFormat: '%a %m/%d'
  },
  yAxis: {
    show: true,
    showCrosshair: false
  },
  tooltip: {
    show: true
  },
  legend: {
    show: true
  },
  data: {
    unitFormat: 'short',
    decimals: null
  }
};

const colorSchemes = [
  // Diverging
  { name: 'Spectral', value: 'interpolateSpectral', invert: 'always' },
  { name: 'RdYlGn', value: 'interpolateRdYlGn', invert: 'always' },

  // Sequential (Single Hue)
  { name: 'Blues', value: 'interpolateBlues', invert: 'dark' },
  { name: 'Greens', value: 'interpolateGreens', invert: 'dark' },
  { name: 'Greys', value: 'interpolateGreys', invert: 'dark' },
  { name: 'Oranges', value: 'interpolateOranges', invert: 'dark' },
  { name: 'Purples', value: 'interpolatePurples', invert: 'dark' },
  { name: 'Reds', value: 'interpolateReds', invert: 'dark' },

  // Sequential (Multi-Hue)
  { name: 'BuGn', value: 'interpolateBuGn', invert: 'dark' },
  { name: 'BuPu', value: 'interpolateBuPu', invert: 'dark' },
  { name: 'GnBu', value: 'interpolateGnBu', invert: 'dark' },
  { name: 'OrRd', value: 'interpolateOrRd', invert: 'dark' },
  { name: 'PuBuGn', value: 'interpolatePuBuGn', invert: 'dark' },
  { name: 'PuBu', value: 'interpolatePuBu', invert: 'dark' },
  { name: 'PuRd', value: 'interpolatePuRd', invert: 'dark' },
  { name: 'RdPu', value: 'interpolateRdPu', invert: 'dark' },
  { name: 'YlGnBu', value: 'interpolateYlGnBu', invert: 'dark' },
  { name: 'YlGn', value: 'interpolateYlGn', invert: 'dark' },
  { name: 'YlOrBr', value: 'interpolateYlOrBr', invert: 'dark' },
  { name: 'YlOrRd', value: 'interpolateYlOrRd', invert: 'darm' }
];

export class CarpetPlotCtrl extends MetricsPanelCtrl {
  static templateUrl = 'module.html';

  constructor($scope, $injector, $rootScope, timeSrv) {
    super($scope, $injector);

    this.dataList = null;
    this.data = {};
    this.timeSrv = timeSrv;
    this.colorSchemes = colorSchemes;
    this.fragmentOptions = fragmentsMap;
    this.aggregateOptions = aggregatesMap;
    this.colorModeOptions = colorModesMap;
    this.colorSpaceOptions = colorSpacesMap;
    this.xAxisLabelFormats = labelFormats;
    this.theme = themeProvider.getTheme();

    _.defaultsDeep(this.panel, panelDefaults);

    this.events.on('data-received', this.onDataReceived);
    this.events.on('data-snapshot-load', this.onDataReceived);
    this.events.on('init-edit-mode', this.onInitEditMode);
    this.events.on('render', this.onRender);
  }

  onDataReceived = (dataList) => {
    this.dataList = dataList;
    this.data = this.transformData(dataList);
    this.render();
  }

  onInitEditMode = () => {
    this.addEditorTab('Display', carpetplotDisplayEditor, 2);
    this.addEditorTab('Axes', carpetplotAxesEditor, 3);
    this.unitFormats = kbn.getUnitFormats();
  }

  onRender = () => {
    if (!this.dataList) { return; }
    this.data = this.transformData(this.dataList);
  }

  transformData(data) {
    const converter = createConverter(this.panel.aggregate, this.panel.fragment);
    const { from, to } = this.range || this.timeSrv.timeRange();
    return converter.convertData(from, to, data);
  }

  link(scope, elem, attrs, ctrl) {
    canvasRendering(scope, elem, attrs, ctrl);
  }

  addCustomColor() {
    this.panel.color.customColors.push({ color: '#ffffff' });
    this.render();
  }

  removeCustomColor(i) {
    if (this.panel.color.customColors.length > 2) {
      this.panel.color.customColors.splice(i, 1);
      this.render();
    }
  }

  moveCustomColorUp(i) {
    const j = i === 0
      ? this.panel.color.customColors.length - 1
      : i - 1;
    this.swapCustomColors(i, j);
    this.render();
  }

  moveCustomColorDown(i) {
    const j = i === this.panel.color.customColors.length - 1
      ? 0
      : i + 1;
    this.swapCustomColors(i, j);
    this.render();
  }

  swapCustomColors(i, j) {
    const colors = this.panel.color.customColors;
    const temp = colors[j];
    colors[j] = colors[i];
    colors[i] = temp;
  }

  onNullColorChange = (newColor) => {
    this.panel.color.nullColor = newColor;
    this.render();
  }

  onCustomColorChange = (customColor) => (newColor) => {
    customColor.color = newColor;
    this.render();
  }
}
'use strict';

System.register(['app/plugins/sdk', 'lodash', 'app/core/utils/kbn', './data-converter', './aggregates', './fragments', './color-modes', './color-spaces', './x-axis-label-formats', './canvas/rendering', './display-editor', './axes-editor', './theme-provider', './css/carpet-plot.css!'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, _, kbn, createConverter, aggregates, aggregatesMap, fragments, fragmentsMap, colorModes, colorModesMap, colorSpaces, colorSpacesMap, labelFormats, canvasRendering, carpetplotDisplayEditor, carpetplotAxesEditor, themeProvider, _createClass, panelDefaults, colorSchemes, CarpetPlotCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_dataConverter) {
      createConverter = _dataConverter.default;
    }, function (_aggregates) {
      aggregates = _aggregates.default;
      aggregatesMap = _aggregates.aggregatesMap;
    }, function (_fragments) {
      fragments = _fragments.default;
      fragmentsMap = _fragments.fragmentsMap;
    }, function (_colorModes) {
      colorModes = _colorModes.default;
      colorModesMap = _colorModes.colorModesMap;
    }, function (_colorSpaces) {
      colorSpaces = _colorSpaces.default;
      colorSpacesMap = _colorSpaces.colorSpacesMap;
    }, function (_xAxisLabelFormats) {
      labelFormats = _xAxisLabelFormats.labelFormats;
    }, function (_canvasRendering) {
      canvasRendering = _canvasRendering.default;
    }, function (_displayEditor) {
      carpetplotDisplayEditor = _displayEditor.carpetplotDisplayEditor;
    }, function (_axesEditor) {
      carpetplotAxesEditor = _axesEditor.carpetplotAxesEditor;
    }, function (_themeProvider) {
      themeProvider = _themeProvider.default;
    }, function (_cssCarpetPlotCss) {}],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      panelDefaults = {
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
      colorSchemes = [
      // Diverging
      { name: 'Spectral', value: 'interpolateSpectral', invert: 'always' }, { name: 'RdYlGn', value: 'interpolateRdYlGn', invert: 'always' },

      // Sequential (Single Hue)
      { name: 'Blues', value: 'interpolateBlues', invert: 'dark' }, { name: 'Greens', value: 'interpolateGreens', invert: 'dark' }, { name: 'Greys', value: 'interpolateGreys', invert: 'dark' }, { name: 'Oranges', value: 'interpolateOranges', invert: 'dark' }, { name: 'Purples', value: 'interpolatePurples', invert: 'dark' }, { name: 'Reds', value: 'interpolateReds', invert: 'dark' },

      // Sequential (Multi-Hue)
      { name: 'BuGn', value: 'interpolateBuGn', invert: 'dark' }, { name: 'BuPu', value: 'interpolateBuPu', invert: 'dark' }, { name: 'GnBu', value: 'interpolateGnBu', invert: 'dark' }, { name: 'OrRd', value: 'interpolateOrRd', invert: 'dark' }, { name: 'PuBuGn', value: 'interpolatePuBuGn', invert: 'dark' }, { name: 'PuBu', value: 'interpolatePuBu', invert: 'dark' }, { name: 'PuRd', value: 'interpolatePuRd', invert: 'dark' }, { name: 'RdPu', value: 'interpolateRdPu', invert: 'dark' }, { name: 'YlGnBu', value: 'interpolateYlGnBu', invert: 'dark' }, { name: 'YlGn', value: 'interpolateYlGn', invert: 'dark' }, { name: 'YlOrBr', value: 'interpolateYlOrBr', invert: 'dark' }, { name: 'YlOrRd', value: 'interpolateYlOrRd', invert: 'darm' }];

      _export('CarpetPlotCtrl', CarpetPlotCtrl = function (_MetricsPanelCtrl) {
        _inherits(CarpetPlotCtrl, _MetricsPanelCtrl);

        function CarpetPlotCtrl($scope, $injector, $rootScope, timeSrv) {
          _classCallCheck(this, CarpetPlotCtrl);

          var _this = _possibleConstructorReturn(this, (CarpetPlotCtrl.__proto__ || Object.getPrototypeOf(CarpetPlotCtrl)).call(this, $scope, $injector));

          _this.onDataReceived = function (dataList) {
            _this.dataList = dataList;
            _this.data = _this.transformData(dataList);
            _this.render();
          };

          _this.onInitEditMode = function () {
            _this.addEditorTab('Display', carpetplotDisplayEditor, 2);
            _this.addEditorTab('Axes', carpetplotAxesEditor, 3);
            _this.unitFormats = kbn.getUnitFormats();
          };

          _this.onRender = function () {
            if (!_this.dataList) {
              return;
            }
            _this.data = _this.transformData(_this.dataList);
          };

          _this.onNullColorChange = function (newColor) {
            _this.panel.color.nullColor = newColor;
            _this.render();
          };

          _this.onCustomColorChange = function (customColor) {
            return function (newColor) {
              customColor.color = newColor;
              _this.render();
            };
          };

          _this.dataList = null;
          _this.data = {};
          _this.timeSrv = timeSrv;
          _this.colorSchemes = colorSchemes;
          _this.fragmentOptions = fragmentsMap;
          _this.aggregateOptions = aggregatesMap;
          _this.colorModeOptions = colorModesMap;
          _this.colorSpaceOptions = colorSpacesMap;
          _this.xAxisLabelFormats = labelFormats;
          _this.theme = themeProvider.getTheme();

          _.defaultsDeep(_this.panel, panelDefaults);

          _this.events.on('data-received', _this.onDataReceived);
          _this.events.on('data-snapshot-load', _this.onDataReceived);
          _this.events.on('init-edit-mode', _this.onInitEditMode);
          _this.events.on('render', _this.onRender);
          return _this;
        }

        _createClass(CarpetPlotCtrl, [{
          key: 'transformData',
          value: function transformData(data) {
            var converter = createConverter(this.panel.aggregate, this.panel.fragment);

            var _ref = this.range || this.timeSrv.timeRange(),
                from = _ref.from,
                to = _ref.to;

            return converter.convertData(from, to, data);
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            canvasRendering(scope, elem, attrs, ctrl);
          }
        }, {
          key: 'addCustomColor',
          value: function addCustomColor() {
            this.panel.color.customColors.push({ color: '#ffffff' });
            this.render();
          }
        }, {
          key: 'removeCustomColor',
          value: function removeCustomColor(i) {
            if (this.panel.color.customColors.length > 2) {
              this.panel.color.customColors.splice(i, 1);
              this.render();
            }
          }
        }, {
          key: 'moveCustomColorUp',
          value: function moveCustomColorUp(i) {
            var j = i === 0 ? this.panel.color.customColors.length - 1 : i - 1;
            this.swapCustomColors(i, j);
            this.render();
          }
        }, {
          key: 'moveCustomColorDown',
          value: function moveCustomColorDown(i) {
            var j = i === this.panel.color.customColors.length - 1 ? 0 : i + 1;
            this.swapCustomColors(i, j);
            this.render();
          }
        }, {
          key: 'swapCustomColors',
          value: function swapCustomColors(i, j) {
            var colors = this.panel.color.customColors;
            var temp = colors[j];
            colors[j] = colors[i];
            colors[i] = temp;
          }
        }]);

        return CarpetPlotCtrl;
      }(MetricsPanelCtrl));

      _export('CarpetPlotCtrl', CarpetPlotCtrl);

      CarpetPlotCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=carpetplot-ctrl.js.map

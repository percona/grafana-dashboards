'use strict';

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      angular.module('grafana.controllers').controller('SeriesOverridesDiagramCtrl', ['$scope', '$element', 'popoverSrv', function ($scope, $element, popoverSrv) {
        $scope.overrideMenu = [];
        $scope.currentOverrides = [];
        $scope.override = $scope.override || {};

        $scope.addOverrideOption = function (name, propertyName, values) {
          var option = {};
          option.text = name;
          option.propertyName = propertyName;
          option.index = $scope.overrideMenu.length;
          option.values = values;
          option.submenu = _.map(values, function (value) {
            return { text: String(value), value: value };
          });

          $scope.overrideMenu.push(option);
        };

        $scope.setOverride = function (item, subItem) {
          // handle color overrides
          if (item.propertyName === 'color') {
            $scope.openColorSelector();
            return;
          }

          $scope.override[item.propertyName] = subItem.value;
          $scope.updateCurrentOverrides();
          $scope.ctrl.render();
        };

        $scope.colorSelected = function (color) {
          $scope.override['color'] = color;
          $scope.updateCurrentOverrides();
          $scope.ctrl.render();
        };

        $scope.thresholdsChanged = function (thresholds) {
          $scope.override['thresholds'] = thresholds.value;
          $scope.updateCurrentOverrides();
          $scope.ctrl.render();
        };

        $scope.unitFormatChanged = function (option) {
          $scope.override['unitFormat'] = option.value;
          $scope.updateCurrentOverrides();
          $scope.ctrl.refresh();
        };

        $scope.decimalsChanged = function (option) {
          $scope.override['decimals'] = option.value;
          $scope.updateCurrentOverrides();
          $scope.ctrl.refresh();
        };

        $scope.openColorSelector = function () {
          popoverSrv.show({
            element: $element.find(".dropdown")[0],
            position: 'top center',
            openOn: 'click',
            template: '<gf-color-picker></gf-color-picker>',
            model: {
              autoClose: true,
              colorSelected: $scope.colorSelected
            },
            onClose: function onClose() {
              $scope.ctrl.render();
            }
          });
        };

        $scope.removeOverride = function (option) {
          delete $scope.override[option.propertyName];
          $scope.updateCurrentOverrides();
          $scope.ctrl.refresh();
        };

        $scope.getSeriesNames = function () {
          return _.map($scope.ctrl.series, function (series) {
            return series.alias;
          });
        };

        $scope.updateCurrentOverrides = function () {
          $scope.currentOverrides = [];
          _.each($scope.overrideMenu, function (option) {
            var value = $scope.override[option.propertyName];
            if (_.isUndefined(value)) {
              return;
            }
            $scope.currentOverrides.push({
              name: option.text,
              propertyName: option.propertyName,
              value: String(value)
            });
          });
        };

        //$scope.addOverrideOption('Color', 'color', ['change']);
        $scope.addOverrideOption('Thresholds', 'thresholds', ['custom']);
        $scope.addOverrideOption('Colors', 'invertColors', ['Invert Colors']);
        $scope.addOverrideOption('Value', 'valueName', ['avg', 'min', 'max', 'total', 'current']);
        $scope.addOverrideOption('Decimals', 'decimals', [2]);
        $scope.addOverrideOption('Unit Format', 'unitFormat', ['select']);
        $scope.updateCurrentOverrides();
      }]);
    }
  };
});
//# sourceMappingURL=series_overrides_diagram_ctrl.js.map

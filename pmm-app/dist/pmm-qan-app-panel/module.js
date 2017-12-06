/// <reference path="../../headers/common.d.ts" />
System.register(["app/plugins/sdk", "app/core/config"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, config_1, PanelCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {/// <reference path="../../headers/common.d.ts" />
            PanelCtrl = /** @class */ (function (_super) {
                __extends(PanelCtrl, _super);
                function PanelCtrl($scope, $injector, templateSrv, $sce, $http) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.base_url = '/qan/profile';
                    $scope.trustSrc = function (src) { return $sce.trustAsResourceUrl(src); };
                    $scope.qanParams = {
                        'var-host': null,
                        'from': null,
                        'to': null,
                        'tz': config_1.default.bootData.user.timezone,
                        'theme': config_1.default.bootData.user.lightTheme ? 'light' : 'dark'
                    };
                    var setUrl = function () {
                        $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
                    };
                    $scope.$root.onAppEvent('template-variable-value-updated', setUrl);
                    setUrl();
                    $scope.$watch('ctrl.range', function (newValue, oldValue) {
                        if (newValue) {
                            $scope.qanParams.from = newValue.from.valueOf();
                            $scope.qanParams.to = newValue.to.valueOf();
                        }
                    }, true);
                    return _this;
                }
                PanelCtrl.prototype.encodeData = function (data) {
                    return Object.keys(data).map(function (key) {
                        if (data[key]) {
                            return [key, data[key]].map(encodeURIComponent).join('=');
                        }
                    }).join('&');
                };
                PanelCtrl.prototype.link = function ($scope, elem, attrs) {
                    var _this = this;
                    var frame = elem.find('iframe');
                    var panel = elem.find('div.panel-container');
                    var bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
                    panel.css({
                        'background-color': bgcolor,
                        'border': 'none'
                    });
                    var setHeight = function () {
                        var h = frame.contents().find('body').height() || 400;
                        frame.height(h + 100 + 'px');
                        panel.height(h + 150 + 'px');
                    };
                    frame[0].onload = function (event) { return frame.contents().bind('DOMSubtreeModified', function () { return setTimeout(setHeight, 100); }); };
                    // initial url
                    $scope.url = this.base_url + '?' + this.encodeData($scope.qanParams);
                    // updated url
                    $scope.$watch('qanParams', function (newValue, oldValue) {
                        $scope.url = _this.base_url + '?' + _this.encodeData($scope.qanParams);
                    }, true);
                };
                PanelCtrl.template = "\n    <iframe ng-src=\"{{ trustSrc(url) }}\"\n      style=\"width: 100%; height: 400px; border: 0;\" scrolling=\"no\" />\n  ";
                return PanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", PanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
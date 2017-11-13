/// <reference path="../../headers/common.d.ts" />
System.register(["app/plugins/sdk"], function (exports_1, context_1) {
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
    var sdk_1, WrapperCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {/// <reference path="../../headers/common.d.ts" />
            WrapperCtrl = /** @class */ (function (_super) {
                __extends(WrapperCtrl, _super);
                function WrapperCtrl($scope, $injector, templateSrv, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.base_url = '/qan/profile';
                    $scope.url = _this.base_url;
                    $scope.trustSrc = function (src) { return $sce.trustAsResourceUrl(src); };
                    $scope.qanParams = {
                        'var-host': null,
                        'from': null,
                        'to': null,
                        'tz': 'local'
                    };
                    $scope.$root.onAppEvent('template-variable-value-updated', function (v) {
                        $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
                    });
                    $scope.$watch('ctrl.range', function (newValue, oldValue) {
                        if (newValue) {
                            $scope.qanParams.from = newValue.from.valueOf();
                            $scope.qanParams.to = newValue.to.valueOf();
                        }
                    }, true);
                    $scope.$watch('ctrl.dashboard.timezone', function (newValue, oldValue) {
                        $scope.qanParams.tz = newValue === 'utc' ? 'utc' : 'local';
                    }, true);
                    return _this;
                }
                WrapperCtrl.prototype.encodeData = function (data) {
                    return Object.keys(data).map(function (key) {
                        if (data[key]) {
                            return [key, data[key]].map(encodeURIComponent).join('=');
                        }
                    }).join('&');
                };
                WrapperCtrl.prototype.link = function (scope, elem, attrs) {
                    var _this = this;
                    try {
                        scope.qanParams['var-host'] = this.templateSrv.variables[0].current.value;
                    }
                    catch (e) {
                        console.log('cannot set up initial host');
                    }
                    var frame = elem.find('#qan-iframe');
                    var panel = elem.find('#qan-panel').closest('div.panel-container');
                    panel.width('100%');
                    panel.css({ 'background-color': '#141414', 'border': 'none' });
                    frame[0].onload = function (event) {
                        setTimeout(function () {
                            frame.contents().bind('DOMSubtreeModified', function () {
                                var h = frame.contents().find("body").height();
                                frame.height(h + 100 + 'px');
                                panel.height(h + 150 + 'px');
                            });
                        }, 500);
                    };
                    // initial url
                    scope.url = this.base_url + '?' + this.encodeData(scope.qanParams);
                    // updated url
                    scope.$watch('qanParams', function (newValue, oldValue) {
                        scope.url = _this.base_url + '?' + _this.encodeData(scope.qanParams);
                    }, true);
                };
                WrapperCtrl.templateUrl = './panel/panel.html';
                return WrapperCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("WrapperCtrl", WrapperCtrl);
        }
    };
});
//# sourceMappingURL=wrapper_ctrl.js.map
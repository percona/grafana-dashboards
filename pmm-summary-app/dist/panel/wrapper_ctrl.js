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
                function WrapperCtrl($scope, $injector, templateSrv, $sce, $http) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.base_url = '/qan/sys-summary?var-host=';
                    $scope.url = _this.base_url;
                    _this.templateSrv = templateSrv;
                    $scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    };
                    $scope.$root.onAppEvent('template-variable-value-updated', function (v) {
                        $scope.url = _this.base_url + templateSrv.variables[0].current.value;
                    });
                    return _this;
                }
                WrapperCtrl.prototype.link = function (scope, elem, attrs) {
                    try {
                        // initial url
                        scope.url = this.base_url + this.templateSrv.variables[0].current.value;
                    }
                    catch (e) {
                        console.log('cannot set up initial host');
                    }
                    var frame = elem.find('#percona-summary-iframe');
                    var panel = elem.find('#percona-summary-panel').closest('div.panel-container');
                    frame[0].onload = function (event) {
                        setTimeout(function () {
                            frame.contents().bind('DOMSubtreeModified', function () {
                                var h = frame.contents().find('body').height();
                                frame.height(h + 100 + 'px');
                                panel.height(h + 150 + 'px');
                            });
                        }, 2000);
                    };
                };
                WrapperCtrl.templateUrl = './panel/panel.html';
                return WrapperCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("WrapperCtrl", WrapperCtrl);
        }
    };
});
//# sourceMappingURL=wrapper_ctrl.js.map
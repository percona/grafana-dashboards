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
                    _this.base_url = '/qan/add-instance';
                    $scope.trustSrc = function (src) { return $sce.trustAsResourceUrl(src); };
                    $scope.qanParams = {
                        'theme': config_1.default.bootData.user.lightTheme ? 'light' : 'dark'
                    };
                    $scope.url = _this.base_url + '?theme=' + $scope.qanParams.theme;
                    return _this;
                }
                PanelCtrl.prototype.link = function ($scope, elem, attrs) {
                    var frame = elem.find('iframe');
                    var panel = elem.find('div.panel-container');
                    var bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
                    panel.css({
                        'background-color': bgcolor,
                        'border': 'none'
                    });
                    frame[0].onload = function (event) {
                        frame.contents().bind('DOMSubtreeModified', function () {
                            var h = frame.contents().find('body').height();
                            frame.height(h + 100 + 'px');
                            panel.height(h + 150 + 'px');
                        });
                    };
                };
                PanelCtrl.template = "\n\t\t<iframe ng-src=\"{{ trustSrc(url) }}\"\n\t\t\tstyle=\"width: 100%; height: 400px; border: 0;\" />\n\t";
                return PanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", PanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
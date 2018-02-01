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
                function PanelCtrl($scope, $injector, templateSrv, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    $scope.qanParams = {
                        'var-host': null,
                        'from': null,
                        'queryID': null,
                        'type': null,
                        'to': null,
                        'tz': config_1.default.bootData.user.timezone,
                        'theme': config_1.default.bootData.user.lightTheme ? 'light' : 'dark'
                    };
                    $scope.trustSrc = function (src) { return $sce.trustAsResourceUrl(src); };
                    _this.setUrl($scope, templateSrv);
                    $scope.$root.onAppEvent('template-variable-value-updated', _this.setUrl.bind(_this, $scope, templateSrv));
                    $scope.$watch('ctrl.range', function (newValue) {
                        if (!newValue)
                            return;
                        $scope.qanParams.from = newValue.from.valueOf();
                        $scope.qanParams.to = newValue.to.valueOf();
                    }, true);
                    return _this;
                }
                PanelCtrl.prototype.link = function ($scope, elem, $location, $window) {
                    var _this = this;
                    var frame = elem.find('iframe');
                    var panel = elem.find('div.panel-container');
                    var bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
                    // TODO: investigate this workaround. Inside $window - CtrlPanel
                    var location = $window.$injector.get('$location');
                    var window = $window.$injector.get('$window');
                    panel.css({
                        'background-color': bgcolor,
                        'border': 'none'
                    });
                    // init url
                    // updated url
                    $scope.$watch('qanParams', this.resetUrl.bind(this, $scope), true);
                    _a = this.retrieveDashboardURLParams(location.absUrl()), $scope.qanParams.queryID = _a[0], $scope.qanParams.type = _a[1];
                    frame.on('load', function () {
                        frame.contents().bind('click', function (event) {
                            var _a = _this.retrieveIFrameURLParams(event.currentTarget.URL), queryID = _a[0], type = _a[1];
                            _this.reloadQuery(window, queryID, type);
                        });
                        frame.contents().bind('DOMSubtreeModified', function () { return setTimeout(function () {
                            var h = frame.contents().find('body').height() || 400;
                            frame.height(h + 100 + "px");
                            panel.height(h + 150 + "px");
                        }, 100); });
                    });
                    var _a;
                };
                PanelCtrl.prototype.reloadQuery = function (window, queryID, type) {
                    if (queryID === void 0) { queryID = null; }
                    if (type === void 0) { type = null; }
                    var url = window.location.href.split('&queryID')[0] + "&" + this.encodeData({ queryID: queryID, type: type });
                    history.pushState({}, null, url);
                };
                PanelCtrl.prototype.retrieveDashboardURLParams = function (url) {
                    var currentURL = new URL(url);
                    return [currentURL.searchParams.get('queryID'), currentURL.searchParams.get('type')];
                };
                PanelCtrl.prototype.retrieveIFrameURLParams = function (url) {
                    var currentURL = new URL(url);
                    var id = currentURL.searchParams.get('queryID');
                    var urlArr = url.split('/');
                    var type = urlArr[urlArr.length - 1].split('?')[0];
                    return [id, type];
                };
                PanelCtrl.prototype.encodeData = function (data) {
                    return Object.keys(data)
                        .map(function (key) { return data.hasOwnProperty(key) ? encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) : null; })
                        .join('&');
                };
                // translates Grafana's variables into iframe's URL;
                PanelCtrl.prototype.setUrl = function ($scope, templateSrv) {
                    $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
                };
                PanelCtrl.prototype.resetUrl = function ($scope) {
                    var data = this.encodeData($scope.qanParams);
                    if ($scope.qanParams.type && $scope.qanParams.queryID)
                        $scope.url = "/qan/profile/report/" + $scope.qanParams.type + "?" + data;
                    else
                        $scope.url = "/qan/profile/?" + data;
                };
                PanelCtrl.template = "<iframe ng-src=\"{{trustSrc(url)}}\" style=\"width: 100%; height: 400px; border: 0;\" scrolling=\"no\" />";
                return PanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", PanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
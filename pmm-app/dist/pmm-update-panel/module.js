/// <reference path="../../headers/common.d.ts" />
System.register(["app/plugins/sdk", "app/core/app_events"], function (exports_1, context_1) {
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
    var sdk_1, app_events_1, PanelCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            }
        ],
        execute: function () {/// <reference path="../../headers/common.d.ts" />
            PanelCtrl = /** @class */ (function (_super) {
                __extends(PanelCtrl, _super);
                function PanelCtrl($scope, $injector, $http) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$scope = $scope;
                    _this.$injector = $injector;
                    _this.$http = $http;
                    // Re-init all scope params
                    _this.reset($scope);
                    $scope.logLocation = '';
                    $scope.version = '1.0.0';
                    $scope.checkForUpdate = _this.checkForUpdate.bind(_this, $scope, $http);
                    $scope.update = _this.update.bind(_this, $scope, $http);
                    $scope.getLog = _this.getLog.bind(_this, $scope, $http);
                    $scope.showReleaseNotes = _this.showReleaseNotes.bind(_this, $scope);
                    return _this;
                }
                /**
                 * Send request for update version
                 */
                PanelCtrl.prototype.update = function ($scope, $http) {
                    var modalScope = $scope.$new(true);
                    $scope.$watch(function (newState) {
                        modalScope.output = newState.output;
                        modalScope.isLoaderShown = newState.isLoaderShown;
                        modalScope.isChecked = newState.isChecked;
                        modalScope.isUpdated = newState.isUpdated;
                        modalScope.isOutputShown = newState.isOutputShown;
                        modalScope.shouldBeUpdated = newState.shouldBeUpdated;
                    });
                    $scope.isLoaderShown = true;
                    app_events_1.default.emit('show-modal', {
                        src: PanelCtrl.TEMPLATES.MODAL,
                        scope: modalScope
                    });
                    $http({
                        method: 'POST',
                        url: PanelCtrl.API.UPDATE,
                    }).then(function (response) {
                        $scope.logLocation = response.headers('Location');
                        $scope.getLog($scope, $http);
                    });
                };
                /**
                 * Send request to check if update possible and re-init params
                 */
                PanelCtrl.prototype.checkForUpdate = function ($scope, $http) {
                    $scope.isLoaderShown = true;
                    $http({
                        method: 'GET',
                        url: PanelCtrl.API.CHECK_FOR_UPDATE,
                    }).then(function () {
                        $scope.isLoaderShown = false;
                        $scope.shouldBeUpdated = true;
                        $scope.isChecked = true;
                    }).catch(function () {
                        $scope.isLoaderShown = false;
                        $scope.isChecked = true;
                        // TODO: Error handler should be clarified
                        setTimeout(function () {
                            $scope.isChecked = false;
                            $scope.$apply();
                        }, 5000);
                        $scope.shouldBeUpdated = false;
                    });
                };
                /**
                 * Send request for get info about update status
                 */
                PanelCtrl.prototype.getLog = function ($scope, $http) {
                    var _this = this;
                    if (!$scope.logLocation.length)
                        return;
                    $http({
                        method: 'GET',
                        url: $scope.logLocation,
                    }).then(function (response) {
                        $scope.output = response.data.detail;
                        if (response.data.title === PanelCtrl.PROCESS_STATUSES.IN_PROGRESS)
                            window.setTimeout(_this.getLog.bind(_this, $scope, $http), 1000);
                        if (response.data.title === PanelCtrl.PROCESS_STATUSES.DONE) {
                            _this.reset($scope);
                            $scope.isUpdated = true;
                        }
                    }).catch(function () {
                        _this.reset($scope);
                    });
                };
                /**
                 * Send request to get info about new version
                 */
                PanelCtrl.prototype.showReleaseNotes = function ($scope) {
                    // TODO: will be implemented after API release
                };
                /**
                 * Re-init all inner parameters that can be changed during update
                 */
                PanelCtrl.prototype.reset = function ($scope) {
                    $scope.output = '';
                    $scope.isLoaderShown = false;
                    $scope.isChecked = false;
                    $scope.isUpdated = false;
                    $scope.isOutputShown = true;
                    $scope.shouldBeUpdated = false;
                };
                /**
                 * Urls to define panels templates
                 */
                PanelCtrl.TEMPLATES = {
                    MAIN: 'pmm-update-panel/index.html',
                    MODAL: 'public/plugins/pmm-update-panel/modal.html',
                };
                /**
                 * Urls to define API endpoints
                 */
                PanelCtrl.API = {
                    CHECK_FOR_UPDATE: '/configurator/v1/check-update',
                    UPDATE: '/configurator/v1/updates'
                };
                /**
                 * Possible statuses of update version process (returned by backend)
                 */
                PanelCtrl.PROCESS_STATUSES = {
                    IN_PROGRESS: 'running',
                    DONE: 'succeeded',
                    ERROR: 'error'
                };
                /**
                 * Grafana param, define url of template that will be used for panel
                 */
                PanelCtrl.templateUrl = PanelCtrl.TEMPLATES.MAIN;
                return PanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", PanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
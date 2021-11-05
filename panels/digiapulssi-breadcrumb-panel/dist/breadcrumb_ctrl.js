"use strict";

System.register(["lodash", "app/plugins/sdk", "./breadcrumb.css!"], function (_export, _context) {
    "use strict";

    var _, PanelCtrl, _createClass, panelDefaults, BreadcrumbCtrl;

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
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_appPluginsSdk) {
            PanelCtrl = _appPluginsSdk.PanelCtrl;
        }, function (_breadcrumbCss) {}],
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
                isRootDashboard: false,
                hideTextInRootDashboard: false,
                breadcrumbItemsMaxAmount: 25
            };

            _export("PanelCtrl", _export("BreadcrumbCtrl", BreadcrumbCtrl = function (_PanelCtrl) {
                _inherits(BreadcrumbCtrl, _PanelCtrl);

                /**
                 * Breadcrumb class constructor
                 * @param {IBreadcrumbScope} $scope Angular scope
                 * @param {ng.auto.IInjectorService} $injector Angluar injector service
                 * @param {ng.ILocationService} $location Angular location service
                 * @param {any} backendSrv Grafana backend callback
                 */
                function BreadcrumbCtrl($scope, $injector, $location, backendSrv) {
                    _classCallCheck(this, BreadcrumbCtrl);

                    var _this = _possibleConstructorReturn(this, (BreadcrumbCtrl.__proto__ || Object.getPrototypeOf(BreadcrumbCtrl)).call(this, $scope, $injector));

                    panelDefaults.isRootDashboard = false;
                    panelDefaults.hideTextInRootDashboard = false;
                    panelDefaults.breadcrumbItemsMaxAmount = 25;
                    _.defaults(_this.panel, panelDefaults);
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    // Init variables
                    $scope.navigate = _this.navigate.bind(_this);
                    _this.backendSrv = backendSrv;
                    _this.dashboardList = [];
                    _this.windowLocation = $location;
                    // Check for browser session storage and create one if it doesn't exist
                    if (!sessionStorage.getItem("dashlist") || _this.panel.isRootDashboard) {
                        sessionStorage.setItem("dashlist", "[]");
                    }
                    // Check if URL params has breadcrumb
                    if ($location.search().breadcrumb) {
                        var items = $location.search().breadcrumb.split(",");
                        _this.createDashboardList(items);
                    } else {
                        // If no URL params are given then get dashboard list from session storage
                        _this.dashboardList = JSON.parse(sessionStorage.getItem("dashlist"));
                    }
                    _this.updateText();
                    // Listen for PopState events so we know when user navigates back with browser
                    // On back navigation we'll take the changed breadcrumb param from url query and
                    // recreate dashboard list
                    window.onpopstate = function (event) {
                        if (_this.dashboardList.length > 0) {
                            if ($location.state().breadcrumb) {
                                var _items = $location.state().breadcrumb.split(",");
                                _this.createDashboardList(_items);
                            }
                        }
                    };
                    return _this;
                }
                /**
                 * Callback for showing panel editor template
                 */


                _createClass(BreadcrumbCtrl, [{
                    key: "onInitEditMode",
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/digiapulssi-breadcrumb-panel/editor.html', 2);
                    }
                }, {
                    key: "createDashboardList",
                    value: function createDashboardList(items) {
                        var _this2 = this;

                        if (this.allDashboards) {
                            // Dashboard data has been loaeded from Grafana
                            this.filterDashboardList(items, this.allDashboards);
                        } else {
                            // Fetch list of all dashboards from Grafana
                            this.backendSrv.search().then(function (result) {
                                _this2.filterDashboardList(items, result);
                            });
                        }
                    }
                }, {
                    key: "filterDashboardList",
                    value: function filterDashboardList(DBlist, allDBs) {
                        var _this3 = this;

                        var orgId = this.windowLocation.search()["orgId"];
                        var urlRoot = window.location.href.substr(0, window.location.href.indexOf("/d/") + 1);
                        this.dashboardList = DBlist.filter(function (filterItem) {
                            var isInDatabase = _.findIndex(allDBs, function (dbItem) {
                                return dbItem.url.indexOf("/d/" + filterItem) > -1;
                            }) > -1;
                            return isInDatabase;
                        }).map(function (item) {
                            var uid = _.find(allDBs, function (dbItem) {
                                return dbItem.url.indexOf("/d/" + item) > -1;
                            }).uid;
                            return {
                                url: "/d/" + uid,
                                name: _.find(allDBs, function (dbItem) {
                                    return dbItem.url.indexOf("/d/" + item) > -1;
                                }).title,
                                params: _this3.parseParamsString({ orgId: orgId }),
                                uid: uid,
                                fullUrl: urlRoot + '/d/' + uid + _this3.parseParamsString({ orgId: orgId })
                            };
                        });
                        // Update session storage
                        sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
                    }
                }, {
                    key: "parseBreadcrumbForUrl",
                    value: function parseBreadcrumbForUrl() {
                        var _this4 = this;

                        var parsedBreadcrumb = "";
                        this.dashboardList.map(function (item, index) {
                            parsedBreadcrumb += item.url.split("/").pop();
                            if (index < _this4.dashboardList.length - 1) {
                                parsedBreadcrumb += ",";
                            }
                        });
                        return parsedBreadcrumb;
                    }
                }, {
                    key: "updateText",
                    value: function updateText() {
                        var _this5 = this;

                        // Get Grafana query params
                        var grafanaQueryParams = "";
                        Object.keys(this.windowLocation.search()).map(function (param) {
                            if (_this5.windowLocation.search()[param] && _this5.windowLocation.search()[param] !== "null") {
                                grafanaQueryParams += "&" + param + "=" + _this5.windowLocation.search()[param];
                            }
                        });
                        // Fetch list of all dashboards from Grafana
                        this.backendSrv.search().then(function (result) {
                            _this5.allDashboards = result;
                            // Set current dashboard
                            var path = window.location.pathname.split("/");
                            _this5.currentDashboard = path.pop();
                            var dbSource = "/d/" + path.pop();
                            var uri = "" + dbSource;
                            var obj = _.find(result, function (dbItem) {
                                return dbItem.url.indexOf("" + uri) > -1;
                            });
                            // Add current dashboard to breadcrumb if it doesn't exist
                            if (_.findIndex(_this5.dashboardList, function (dbItem) {
                                return dbItem.url.indexOf("" + uri) > -1;
                            }) < 0 && obj) {
                                _this5.dashboardList.push({ url: uri, name: obj.title, params: grafanaQueryParams, uid: obj.uid,
                                    fullUrl: window.location.href });
                            }
                            // If the amount of items exceeds the maximum then remove oldest item
                            var breadcrumbItemsMaxAmount = parseInt(_this5.panel.breadcrumbItemsMaxAmount, 10);
                            if (!isNaN(breadcrumbItemsMaxAmount) && _this5.dashboardList.length > breadcrumbItemsMaxAmount) {
                                _this5.dashboardList.shift();
                            }
                            // Update session storage
                            sessionStorage.setItem("dashlist", JSON.stringify(_this5.dashboardList));
                            // Parse modified breadcrumb and set it to url query params
                            var parsedBreadcrumb = _this5.parseBreadcrumbForUrl();
                            var queryObject = _this5.parseParamsObject(grafanaQueryParams);
                            queryObject["breadcrumb"] = parsedBreadcrumb;
                            _this5.windowLocation.state(queryObject).replace();
                            history.replaceState(queryObject, "");
                        });
                    }
                }, {
                    key: "parseParamsObject",
                    value: function parseParamsObject(params) {
                        var paramsObj = {};
                        if (params.charAt(0) === "?" || params.charAt(0) === "&") {
                            params = params.substr(1, params.length);
                        }
                        var paramsArray = params.split("&");
                        paramsArray.map(function (paramItem) {
                            var paramItemArr = paramItem.split("=");
                            paramsObj[paramItemArr[0]] = paramItemArr[1];
                        });
                        return paramsObj;
                    }
                }, {
                    key: "parseParamsString",
                    value: function parseParamsString(params) {
                        var paramsString = "?";
                        Object.keys(params).map(function (paramKey, index) {
                            paramsString += paramKey + "=" + params[paramKey];
                            if (index < Object.keys(params).length - 1) {
                                paramsString += "&";
                            }
                        });
                        return paramsString;
                    }
                }, {
                    key: "navigate",
                    value: function navigate(url, params) {
                        // Check if user is navigating backwards in breadcrumb and
                        // remove all items that follow the selected item in that case
                        var index = _.findIndex(this.dashboardList, function (dbItem) {
                            return dbItem.url.indexOf("" + url) > -1;
                        });
                        if (index > -1 && this.dashboardList.length >= index + 2) {
                            this.dashboardList.splice(index + 1, this.dashboardList.length - index - 1);
                            sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
                        }
                        // Parse params string to object
                        var queryParams = this.parseParamsObject(params);
                        // Delete possible breadcrumb param so that breadcrumb from session will be used instead
                        delete queryParams["breadcrumb"];
                        // Check url root assuming that Grafana dashboard url has string "/d/"
                        var urlRoot = window.location.href.substr(0, window.location.href.indexOf("/d/") + 1);
                        if (url.charAt(0) != "/") {
                            urlRoot += "/";
                        }
                    }
                }]);

                return BreadcrumbCtrl;
            }(PanelCtrl)));

            BreadcrumbCtrl.templateUrl = "module.html";

            _export("BreadcrumbCtrl", BreadcrumbCtrl);

            _export("PanelCtrl", BreadcrumbCtrl);
        }
    };
});
//# sourceMappingURL=breadcrumb_ctrl.js.map

/**
 * <h3>Breadcrumb panel for Grafana</h3>
 *
 * This breadcumb panel utilizes session storage to store dashboards where user has visited.
 * When panel is loaded it first checks if breadcrumb is given in url params and utilizes that.
 * If no breadcrumb is given in url params then panel tries to read breadcrumb from session storage.
 * Finally the panel adds the just loaded dashboard as the latest item in dashboard and updates session storage.
 * Breadcrumb stores the dashboard's name, url and possible query params to the session storage.
 * If user navigates with browser back button then breadcrumb is recreated from previous url params.
 * Also if user navigates back by clicking one of the breadcrumb items then the items following the selected
 * item are removed from breadcrumb, user is moved to selected dashboard and session storage is updated.
 */

/// <reference path="../typings/common.d.ts" />
/// <reference path="../typings/index.d.ts" />

import _ from "lodash";
import { PanelCtrl } from "app/plugins/sdk";
import { impressions } from "app/features/dashboard/impression_store";
import config from "app/core/config";
import "./breadcrumb.css!";

export interface IBreadcrumbScope extends ng.IScope {
    navigate: (url: string) => void;
}

export interface dashboardListItem {
    url: string;
    name: string;
    params: string;
    uid: string;
    fullUrl: string;
}

const panelDefaults = {
    isRootDashboard: false,
    hideTextInRootDashboard: false,
    breadcrumbItemsMaxAmount: 25
};

class BreadcrumbCtrl extends PanelCtrl {
    static templateUrl = "module.html";
    backendSrv: any;
    dashboardList: dashboardListItem[];
    currentDashboard: string;
    windowLocation: ng.ILocationService;
    panel: any;
    allDashboards: any;

    /**
     * Breadcrumb class constructor
     * @param {IBreadcrumbScope} $scope Angular scope
     * @param {ng.auto.IInjectorService} $injector Angluar injector service
     * @param {ng.ILocationService} $location Angular location service
     * @param {any} backendSrv Grafana backend callback
     */
    constructor($scope: IBreadcrumbScope, $injector: ng.auto.IInjectorService, $location: ng.ILocationService, backendSrv: any) {
        super($scope, $injector);
        panelDefaults.isRootDashboard = false;
        panelDefaults.hideTextInRootDashboard = false;
        panelDefaults.breadcrumbItemsMaxAmount = 25;
        _.defaults(this.panel, panelDefaults);
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        // Init variables
        $scope.navigate = this.navigate.bind(this);
        this.backendSrv = backendSrv;
        this.dashboardList = [];
        this.windowLocation = $location;
        // Check for browser session storage and create one if it doesn't exist
        if (!sessionStorage.getItem("dashlist") || this.panel.isRootDashboard) {
            sessionStorage.setItem("dashlist", "[]");
        }
        // Check if URL params has breadcrumb
        if ($location.search().breadcrumb) {
            const items = $location.search().breadcrumb.split(",");
            this.createDashboardList(items);
        } else {
            // If no URL params are given then get dashboard list from session storage
            this.dashboardList = JSON.parse(sessionStorage.getItem("dashlist"));
        }
        this.updateText();
        // Listen for PopState events so we know when user navigates back with browser
        // On back navigation we'll take the changed breadcrumb param from url query and
        // recreate dashboard list
        window.onpopstate = (event: Event) => {
            if (this.dashboardList.length > 0) {
                if ($location.state().breadcrumb) {
                    const items = $location.state().breadcrumb.split(",");
                    this.createDashboardList(items);
                }
            }
        }
    }

    /**
     * Callback for showing panel editor template
     */
    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/digiapulssi-breadcrumb-panel/editor.html', 2);
    }

    /**
     * Create dashboard items
     * @param {string[]} items Array of dashboard ids
     */
     createDashboardList(items: string[]) {
         if (this.allDashboards) {
             // Dashboard data has been loaeded from Grafana
             this.filterDashboardList(items, this.allDashboards);
         } else {
             // Fetch list of all dashboards from Grafana
             this.backendSrv.search().then((result: any) => {
                 this.filterDashboardList(items, result);
             });
         }
     }

     /**
      * Filter dashboard list
      * @param {string[]} DBlist Array of dashboards ids to be displayed
      * @param {any} allDBs All dashboards fetched from Grafana API
      */
     filterDashboardList(DBlist: string[], allDBs: any) {
         var orgId = this.windowLocation.search()["orgId"];
         var urlRoot = window.location.href.substr(0, window.location.href.indexOf("/d/") + 1);
         this.dashboardList = DBlist.filter((filterItem: string) => {
             const isInDatabase = _.findIndex(allDBs, (dbItem) => dbItem.url.indexOf(`/d/${filterItem}`) > -1) > -1;
             return (isInDatabase);
         })
         .map((item: string) => {
             const uid = _.find(allDBs, (dbItem) => dbItem.url.indexOf(`/d/${item}`) > -1).uid;
             return {
                 url: `/d/${uid}`,
                 name: _.find(allDBs, (dbItem) => dbItem.url.indexOf(`/d/${item}`) > -1).title,
                 params: this.parseParamsString({ orgId }),
                 uid,
                 fullUrl: urlRoot + '/d/' + uid + this.parseParamsString({ orgId })
             }
         });
         // Update session storage
         sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
     }

    /**
     * Parse breadcrumb string for URL
     * @returns {string}
     */
    parseBreadcrumbForUrl() {
        let parsedBreadcrumb = "";
        this.dashboardList.map((item, index) => {
            parsedBreadcrumb += item.url.split("/").pop();
            if (index < this.dashboardList.length - 1) {
                parsedBreadcrumb += ",";
            }
        });
        return parsedBreadcrumb;
    }

    /**
     * Update Breadcrumb items
     */
    updateText() {
       // Get Grafana query params
       let grafanaQueryParams = "";
       Object.keys(this.windowLocation.search()).map((param) => {
           if (this.windowLocation.search()[param] && this.windowLocation.search()[param] !== "null") {
               grafanaQueryParams += "&" + param + "=" + this.windowLocation.search()[param];
           }
       });
       // Fetch list of all dashboards from Grafana
       this.backendSrv.search().then((result: any) => {
          this.allDashboards = result;
           // Set current dashboard
           var path = window.location.pathname.split("/");
           this.currentDashboard = path.pop();
           const dbSource = "/d/" + path.pop();
           const uri = `${dbSource}`;
           var obj: any = _.find(result, (dbItem) => dbItem.url.indexOf(`${uri}`) > -1);
           // Add current dashboard to breadcrumb if it doesn't exist
           if (_.findIndex(this.dashboardList, (dbItem) => dbItem.url.indexOf(`${uri}`) > -1) < 0 && obj) {
               this.dashboardList.push( { url: uri, name: obj.title, params: grafanaQueryParams, uid: obj.uid,
                  fullUrl: window.location.href } );
           }
           // If the amount of items exceeds the maximum then remove oldest item
           const breadcrumbItemsMaxAmount = parseInt(this.panel.breadcrumbItemsMaxAmount, 10);
           if (!isNaN(breadcrumbItemsMaxAmount) && this.dashboardList.length > breadcrumbItemsMaxAmount) {
               this.dashboardList.shift();
           }
           // Update session storage
           sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
           // Parse modified breadcrumb and set it to url query params
           const parsedBreadcrumb = this.parseBreadcrumbForUrl();
           const queryObject = this.parseParamsObject(grafanaQueryParams);
           queryObject["breadcrumb"] = parsedBreadcrumb;
           this.windowLocation.state(queryObject).replace();
           history.replaceState(queryObject, "");
       });
    }

    /**
     * Parse params string to object
     * @param {string} params
     * @returns {Object}
     */
    parseParamsObject(params: string) {
       const paramsObj = {};
       if (params.charAt(0) === "?" || params.charAt(0) === "&") {
           params = params.substr(1, params.length);
       }
       const paramsArray = params.split("&");
       paramsArray.map((paramItem) => {
           const paramItemArr = paramItem.split("=");
           paramsObj[paramItemArr[0]] = paramItemArr[1];
       });
       return paramsObj;
    }

    /**
     * Parse params object to string
     * @param {Object} params
     * @returns {string}
     */
    parseParamsString(params: Object) {
       let paramsString = "?";
       Object.keys(params).map((paramKey, index) => {
           paramsString += paramKey + "=" + params[paramKey];
           if (index < Object.keys(params).length - 1) {
               paramsString += "&";
           }
       });
       return paramsString;
    }

    /**
     * Navigate to given dashboard
     * @param {string} url
     */
    navigate(url: string, params: string) {
       // Check if user is navigating backwards in breadcrumb and
       // remove all items that follow the selected item in that case
       const index = _.findIndex(this.dashboardList, (dbItem) => dbItem.url.indexOf(`${url}`) > -1);
       if (index > -1 && this.dashboardList.length >= index + 2) {
           this.dashboardList.splice(index + 1, this.dashboardList.length - index - 1);
           sessionStorage.setItem("dashlist", JSON.stringify(this.dashboardList));
       }
       // Parse params string to object
       const queryParams = this.parseParamsObject(params);
       // Delete possible breadcrumb param so that breadcrumb from session will be used instead
       delete queryParams["breadcrumb"];
       // Check url root assuming that Grafana dashboard url has string "/d/"
       let urlRoot = window.location.href.substr(0, window.location.href.indexOf("/d/") + 1);
       if (url.charAt(0) != "/") {
           urlRoot += "/";
       }
    }

}

export { BreadcrumbCtrl, BreadcrumbCtrl as PanelCtrl }

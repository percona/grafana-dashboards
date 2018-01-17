/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import AppEvents from 'app/core/app_events';

import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    /*
    *
    * Urls to define panels templates
    *
    * */
    static TEMPLATES = {
        MAIN: 'pmm-update-panel/index.html',
        MODAL: 'public/plugins/pmm-update-panel/modal.html',
    };

    /*
    *
    * Urls to define API endpoints
    *
    * */
    static API = {
        CHECK_FOR_UPDATE: '/configurator/v1/check-update',
        UPDATE: '/configurator/v1/updates'
    };

    /*
    *
    * Possible statuses of update version process (returned by backend)
    *
    * */
    static PROCESS_STATUSES = {
        IN_PROGRESS: 'running',
        DONE: 'succeeded',
        ERROR: 'error'
    };

    /*
    *
    * Grafana param, define url of template that will be used for panel
    *
    * */
    static templateUrl: string = PanelCtrl.TEMPLATES.MAIN;

    constructor($scope, $injector, $http) {
        // console.log('$window', $window, $scope)
        super($scope, $injector);

        // Re-init all scope params
        this.reset($scope);

        $scope.logLocation = '';
        $scope.version = '1.0.0';

        $scope.checkForUpdate = this.checkForUpdate.bind(this, $scope, $http);
        $scope.update = this.update.bind(this, $scope, $http);
        $scope.getLog = this.getLog.bind(this, $scope, $http);
        $scope.showReleaseNotes = this.showReleaseNotes.bind(this, $scope);
        $scope.copyToClipboard = this.copyToClipboard.bind(this, $scope);
    }

    /*
    *
    * Send request for update version
    *
    * */
    private update($scope, $http): void {
        $scope.isLoaderShown = true;

        AppEvents.emit('show-modal', {
            src: PanelCtrl.TEMPLATES.MODAL,
            modalClass: 'confirm-modal',
            scope: $scope
        });

        $http({
            method: 'POST',
            url: PanelCtrl.API.UPDATE,
        }).then(response => {
            $scope.logLocation = response.headers('Location');
            $scope.getLog($scope, $http);
        }, error => {
        });
    }

    /*
    *
    * Send request to check if update possible and re-init params
    *
    * */
    private checkForUpdate($scope, $http): void {
        $scope.isLoaderShown = true;

        $http({
            method: 'GET',
            url: PanelCtrl.API.CHECK_FOR_UPDATE,
        }).then(response => {
            $scope.isLoaderShown = false;
            $scope.shouldBeUpdated = true;
            $scope.isChecked = true;
        }, () => {
            $scope.isLoaderShown = false;
            $scope.isChecked = true;
            // TODO: Error handler should be clarified
            setTimeout(() => {
                $scope.isChecked = false;
                $scope.$apply();
            }, 5000);

            $scope.shouldBeUpdated = false;
        });
    }

    /*
    *
    * Send request for get info about update status
    *
    * */
    private getLog($scope, $http): void {
        if (!$scope.logLocation.length) return;

        $http({
            method: 'GET',
            url: $scope.logLocation,
        }).then(response => {
            $scope.output = response.data.detail;

            if (response.data.title === PanelCtrl.PROCESS_STATUSES.IN_PROGRESS) window.setTimeout($scope.getLog, 1000);
            if (response.data.title === PanelCtrl.PROCESS_STATUSES.DONE) {
                $scope.shouldBeUpdated = false;
                $scope.isUpdated = true;
                $scope.isLoaderShown = false;
            }
        }, error => {
            $scope.isLoaderShown = false;
        });
    }

    /*
    *
    * Send request to get info about new version
    *
    * */
    private showReleaseNotes($scope) {
    }

    /*
    *
    * Send request to get info about new version
    *
    * */
    private copyToClipboard($scope) {
    }

    /*
    *
    * Re-init all inner parameters that can be changed during update
    *
    * */
    private reset($scope): void {
        $scope.output = '';
        $scope.isLoaderShown = false;
        $scope.isChecked = false;
        $scope.isUpdated = false;
        $scope.isOutputShown = true;
        $scope.shouldBeUpdated = false;
    }
}

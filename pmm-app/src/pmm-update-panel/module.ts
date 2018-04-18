/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import AppEvents from 'app/core/app_events';

import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    /**
     * Urls to define panels templates
     */
    static TEMPLATES = {
        MAIN: 'pmm-update-panel/index.html',
        MODAL: 'public/plugins/pmm-update-panel/modal.html',
    };

    /**
     * Urls to define API endpoints
     */
    static API = {
        GET_CURRENT_VERSION: '/configurator/v1/version',
        CHECK_FOR_UPDATE: '/configurator/v1/check-update',
        UPDATE: '/configurator/v1/updates'
    };

    /**
     * Possible statuses of update version process (returned by backend)
     */
    static PROCESS_STATUSES = {
        FAILED: 'failed',
        IN_PROGRESS: 'running',
        DONE: 'succeeded',
        ERROR: 'error'
    };
    /**
     * Possible errors during update process
     */
    static ERRORS = {
        UPDATE: 'Error during update',
        NOTHING_TO_UPDATE: 'Nothing to update',
        INCORRECT_SERVER_RESPONSE: 'Incorrect server response'
    };

    /**
     * Grafana param, define url of template that will be used for panel
     */
    static templateUrl: string = PanelCtrl.TEMPLATES.MAIN;

    constructor(public $scope, public $injector, public $http) {
        super($scope, $injector);

        // Re-init all scope params
        this.reset($scope);

        $scope.logLocation = '';
        $scope.version = '';
        $scope.nextVersion = '';
        $scope.linkVersion = '';
        $scope.errorMessage = '';

        $scope.checkForUpdate = this.checkForUpdate.bind(this, $scope, $http);
        $scope.update = this.update.bind(this, $scope, $http);
        $scope.getLog = this.getLog.bind(this, $scope, $http);
        $scope.showReleaseNotes = this.showReleaseNotes.bind(this, $scope);
        $scope.getCurrentVersion = this.getCurrentVersion.bind(this, $scope, $http);
        $scope.getCurrentVersion($scope, $http);

    }

    /**
     * Send request for update version
     */
    private update($scope, $http): void {
        const modalScope = $scope.$new(true);
        $scope.$watch(newState => {
            modalScope.output = newState.output;
            modalScope.isLoaderShown = newState.isLoaderShown;
            modalScope.isChecked = newState.isChecked;
            modalScope.isUpdated = newState.isUpdated;
            modalScope.isOutputShown = newState.isOutputShown;
            modalScope.shouldBeUpdated = newState.shouldBeUpdated;
            modalScope.errorMessage = newState.errorMessage;
            modalScope.version = newState.version;
        });
        modalScope.reloadAfterUpdate = () => {
          location.reload();
        };

        $scope.isLoaderShown = true;
        AppEvents.emit('show-modal', {
            src: PanelCtrl.TEMPLATES.MODAL,
            scope: modalScope
        });

        $http({
            method: 'POST',
            url: PanelCtrl.API.UPDATE,
        }).then(response => {
            $scope.logLocation = response.headers('Location');
            $scope.getLog($scope, $http);
        });
    }

    /**
     * Show error message if update is fail
     * @param message - kind of error message
     */
    public displayError($scope, message) {
        $scope.isLoaderShown = false;
        $scope.isChecked = true;
        $scope.errorMessage = message;
        setTimeout(() => {
            $scope.isChecked = false;
            $scope.errorMessage = '';
            $scope.$apply();
        }, 5000);
        $scope.shouldBeUpdated = false;
    }

    /**
     * Send request to check if update possible and re-init params
     */
    private checkForUpdate($scope, $http): void {
        const linkRegExp = new RegExp('^\\d{1,}\\.\\d{1,2}\\.\\d{1,4}');
        $scope.isLoaderShown = true;

        $http({
            method: 'GET',
            url: PanelCtrl.API.CHECK_FOR_UPDATE,
        }).then((res) => {
            $scope.isLoaderShown = false;
            $scope.shouldBeUpdated = true;
            $scope.isChecked = true;
            $scope.nextVersion = res.data.to;
            $scope.version = res.data.from;
            if ($scope.linkVersion = $scope.nextVersion.match(linkRegExp)) {
                $scope.linkVersion = $scope.nextVersion.match(linkRegExp)[0];
            } else {
                this.displayError($scope, PanelCtrl.ERRORS.INCORRECT_SERVER_RESPONSE);
            }

        }).catch(() => {
            this.displayError($scope, PanelCtrl.ERRORS.NOTHING_TO_UPDATE);
        });
    }

    /**
     * Send request to get current version
     */
    private getCurrentVersion($scope, $http): void {
        $http({
            method: 'GET',
            url: PanelCtrl.API.GET_CURRENT_VERSION,
        }).then((res) => {
            $scope.version = res.data.title;
        }).catch(() => {
            //TODO: add error handler
        });
    }

    /**
     * Send request for get info about update status
     */
    private getLog($scope, $http): void {
        if (!$scope.logLocation.length) return;

        $http({
            method: 'GET',
            url: $scope.logLocation,
        }).then(response => {
            $scope.output = response.data.detail;

            if (response.data.title === PanelCtrl.PROCESS_STATUSES.IN_PROGRESS) window.setTimeout(this.getLog.bind(this, $scope, $http), 1000);

            if (response.data.title === PanelCtrl.PROCESS_STATUSES.DONE) {
                this.reset($scope);
                $scope.version = $scope.errorMessage ? $scope.version : $scope.nextVersion;
                $scope.isUpdated = true;
            }
            if (response.data.title === PanelCtrl.PROCESS_STATUSES.FAILED) {
                $scope.isLoaderShown = false;
                $scope.isChecked = true;
                $scope.shouldBeUpdated = true;
                $scope.errorMessage = PanelCtrl.ERRORS.UPDATE;
            }
        }).catch(() => {
            this.reset($scope);
        });
    }

    /**
     * Send request to get info about new version
     */
    private showReleaseNotes($scope) {
        // TODO: will be implemented after API release
    }

    /**
     * Re-init all inner parameters that can be changed during update
     */
    private reset($scope): void {
        $scope.output = '';
        $scope.isLoaderShown = false;
        $scope.isChecked = false;
        $scope.isUpdated = false;
        $scope.isOutputShown = true;
        $scope.shouldBeUpdated = false;
    }
}

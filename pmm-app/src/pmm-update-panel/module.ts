/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import AppEvents from 'app/core/app_events';
import moment from 'moment';
import $ from 'jquery';

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
        GET_CURRENT_VERSION: '/v1/Updates/Check',
        CHECK_FOR_UPDATE: '/v1/Updates/Check',
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
        $scope.errorMessage = '';
        $scope.canBeReloaded = false;
        $scope.isUpdateAvailable = false;
        $scope.isDefaultView = true;
        $scope.newsLink = '';

        $scope.checkForUpdate = this.checkForUpdate.bind(this, $scope, $http);
        $scope.update = this.update.bind(this, $scope, $http);
        $scope.getLog = this.getLog.bind(this, $scope, $http);
        $scope.getCurrentVersion = this.getCurrentVersion.bind(this, $scope, $http);
        $scope.getCurrentVersion($scope, $http);
        const body = document.querySelector('body');
        const escKeyCode = 'Escape';
        body.addEventListener('click', (event) => {
            if ($(event.target).hasClass('modal-backdrop') && $scope.canBeReloaded) location.reload();
        });
        body.addEventListener('keydown', (event) => {
            (event.key === escKeyCode && $scope.canBeReloaded) ? location.reload() : event.stopPropagation();
        });
    }

    /**
     * Send request for update version
     */
    private update($scope, $http): void {
        const modalScope = $scope.$new(true);
        $scope.$watch(newState => {
            modalScope.output = newState.output;
            modalScope.isChecked = newState.isChecked;
            modalScope.isUpdated = newState.isUpdated;
            modalScope.isUpdateAvailable = newState.isUpdateAvailable;
            modalScope.isDefaultView = newState.isDefaultView;
            modalScope.errorMessage = newState.errorMessage;
            modalScope.version = newState.version;
            modalScope.currentReleaseDate = newState.currentReleaseDate;
            modalScope.newReleaseDate = newState.newReleaseDate;
            modalScope.canBeReloaded = newState.canBeReloaded;
        });
        modalScope.reloadAfterUpdate = () => {
            location.reload();
        };

        AppEvents.emit('show-modal', {
            src: PanelCtrl.TEMPLATES.MODAL,
            scope: modalScope,
            backdrop: 'static',
            keyboard: false
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
        $scope.isChecked = true;
        $scope.errorMessage = message;
        setTimeout(() => {
            $scope.isChecked = false;
            $scope.errorMessage = '';
            $scope.$apply();
        }, 5000);
    }

    /**
     * Send request to get current version
     */
    private getCurrentVersion($scope, $http): void {
        $http({
            method: 'POST',
            url: PanelCtrl.API.GET_CURRENT_VERSION,
            params: {force: false}
        }).then((res) => {
            res.data.latest_news_url = 'https://wwww.google.com';
            res.data.update_available = true;
            const data = res.data;
            console.log('data get-current - ', data);

            $scope.version = data.installed.version || '';
            $scope.currentReleaseDate = data.installed.timestamp ? moment(data.timestamp).locale('en').format('MMMM DD, H:mm') : '';
            $scope.isUpdateAvailable = data.update_available || false;

            if ($scope.isUpdateAvailable) {
                this.checkForUpdate.call(this, $scope, $http);
            } else {
                $('#refresh').removeClass('fa-spin');
            }
            $scope.isDefaultView = false;
        }).catch(() => {
            $('#refresh').removeClass('fa-spin');
            //TODO: add error handler
        });
    }

    /**
     * Send request to check if update possible and re-init params
     */
    private checkForUpdate($scope, $http): void {
        const refreshButton = $('#refresh');
        refreshButton.addClass('fa-spin');

        $http({
            method: 'POST',
            url: PanelCtrl.API.CHECK_FOR_UPDATE,
            params: {force: true}
        }).then((res) => {
            res.data.latest_news_url = 'https://wwww.google.com';
            res.data.update_available = true;
            const data = res.data;
            console.log('data check-update - ', data);

            $scope.nextVersion = data.latest.version || '';
            $scope.newReleaseDate = data.latest.timestamp ? moment(data.latest.timestamp).locale('en').format('MMMM DD, H:mm') : '';
            $scope.newsLink = data.latest_news_url || '';
            $scope.isUpdateAvailable = data.update_available || false;
            $scope.isDefaultView = false;
            refreshButton.removeClass('fa-spin');
        }).catch(() => {
            this.displayError($scope, PanelCtrl.ERRORS.NOTHING_TO_UPDATE);
            refreshButton.removeClass('fa-spin');
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
                $scope.currentReleaseDate = $scope.errorMessage ? $scope.currentReleaseDate : $scope.newReleaseDate;
                $scope.isUpdated = true;
                $scope.canBeReloaded = true;
            }
            if (response.data.title === PanelCtrl.PROCESS_STATUSES.FAILED) {
                $scope.isChecked = true;
                $scope.isUpdateAvailable = true;
                $scope.canBeReloaded = true;
                $scope.errorMessage = PanelCtrl.ERRORS.UPDATE;
            }
        }).catch(() => {
            this.reset($scope);
        });
    }

    /**
     * Re-init all inner parameters that can be changed during update
     */
    private reset($scope): void {
        $scope.output = '';
        $scope.isChecked = false;
        $scope.isUpdated = false;
        $scope.isUpdateAvailable = false;
    }
}

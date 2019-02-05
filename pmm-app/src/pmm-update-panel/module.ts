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
        GET_CURRENT_VERSION: '/configurator/v2/version',
        CHECK_FOR_UPDATE: '/configurator/v2/check-update',
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
        $scope.isUpToDate = false;
        $scope.canBeReloaded = false;
        $scope.lastCheckDate = localStorage.getItem('lastCheck') ? moment(Number(localStorage.getItem('lastCheck'))).locale('en').format('MMMM DD, H:mm') : '';
        $scope.currentVersion = localStorage.getItem('currentVersion') || '';
        $scope.currentReleaseDate = localStorage.getItem('currentReleaseDate') || '';
        $scope.shouldBeUpdated = localStorage.getItem('shouldBeUpdated') || '';
        $scope.nextVersion = localStorage.getItem('nextVersion') || '';
        $scope.newReleaseDate = localStorage.getItem('newReleaseDate') || '';
        $scope.disableUpdate = localStorage.getItem('disableUpdate') || '';
        $scope.linkVersion = localStorage.getItem('linkVersion') || '';
        $scope.isNoWebUpdate = localStorage.getItem('isNoWebUpdate') || '';

        $scope.checkForUpdate = this.checkForUpdate.bind(this, $scope, $http);
        $scope.update = this.update.bind(this, $scope, $http);
        $scope.getLog = this.getLog.bind(this, $scope, $http);
        $scope.showReleaseNotes = this.showReleaseNotes.bind(this, $scope);
        $scope.getCurrentVersion = this.getCurrentVersion.bind(this, $scope, $http);
        $scope.getCurrentVersion($scope, $http);
        const body = document.querySelector('body');
        const timeDiff = Date.now() - Number(localStorage.getItem('lastCheck'));
        const escKeyCode = 'Escape';
        body.addEventListener('click', (event) => {
            if ($(event.target).hasClass('modal-backdrop') && $scope.canBeReloaded) location.reload();
        });
        body.addEventListener('keydown', (event) => {
            (event.key === escKeyCode && $scope.canBeReloaded) ? location.reload() : event.stopPropagation();
        });
        if (timeDiff >= 1000 * 60 * 60) {
            this.checkForUpdate($scope, $http);
        }
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
            modalScope.isUpToDate = newState.isUpToDate;
            modalScope.version = newState.version;
            modalScope.currentReleaseDate = newState.currentReleaseDate;
            modalScope.newReleaseDate = newState.newReleaseDate;
            modalScope.disableUpdate = newState.disableUpdate;
            modalScope.canBeReloaded = newState.canBeReloaded;
        });
        modalScope.reloadAfterUpdate = () => {
            location.reload();
        };

        $scope.isLoaderShown = true;
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
        $scope.isLoaderShown = false;
        $scope.isChecked = true;
        $scope.errorMessage = message;
        setTimeout(() => {
            $scope.isChecked = false;
            $scope.errorMessage = '';
            $scope.$apply();
        }, 5000);
        $scope.shouldBeUpdated = '';
    }

    /**
     * Send request to check if update possible and re-init params
     */
    private checkForUpdate($scope, $http): void {
        const linkRegExp = new RegExp('^\\d{1,}\\.\\d{1,2}\\.\\d{1,4}');
        const refreshButton = $('#refresh');
        $scope.isLoaderShown = true;
        refreshButton.addClass('fa-spin');

        $http({
            method: 'GET',
            url: PanelCtrl.API.CHECK_FOR_UPDATE,
        }).then((res) => {
            $scope.isLoaderShown = false;
            $scope.isChecked = true;
            $scope.nextVersion = res.data.version || '';
            $scope.newReleaseDate = res.data.release_date || '';
            $scope.disableUpdate = res.data.disable_update || '';
            const cropLinkVersion = $scope.nextVersion.match(linkRegExp);

            const [currentMajor, currentMinor, currentBugfix] = $scope.currentVersion.split('.');
            const [nextMajor, nextMinor, nextBugfix] = $scope.nextVersion.split('.');

            const isMajor = +nextMajor > +currentMajor;
            const isMinor = (+nextMinor > +currentMinor) && (+nextMajor === +currentMajor);
            const isBugfix = (+nextBugfix > +currentBugfix && (+nextMajor === +currentMajor)) && (+nextMinor === +currentMinor);

            if (isMajor) {
                $scope.isNoWebUpdate = true;
            } else if (isMinor || isBugfix) {
                $scope.isNoWebUpdate = '';
                $scope.shouldBeUpdated = true;
            } else {
                $scope.isNoWebUpdate = '';
                $scope.shouldBeUpdated = '';
                $scope.isUpToDate = true;
            }
            this.getCurrentTime($scope);
            if (cropLinkVersion) {
                $scope.linkVersion = cropLinkVersion[0];
            } else {
                this.displayError($scope, PanelCtrl.ERRORS.INCORRECT_SERVER_RESPONSE);
            }
            this.setNextVersionData($scope);
        }).catch(() => {
            this.displayError($scope, PanelCtrl.ERRORS.NOTHING_TO_UPDATE);
            this.getCurrentTime($scope);
            this.setNextVersionData();
            $scope.isUpToDate = true;
        });
        refreshButton.removeClass('fa-spin');
    }

    /**
     * Save current time to local storage
     * @param $scope
     */
    public getCurrentTime($scope) {
        localStorage.setItem('lastCheck', Date.now().toString());
        $scope.lastCheckDate = moment(Number(localStorage.getItem('lastCheck'))).locale('en').format('MMMM DD, H:mm');
    }

    /**
     * Send request to get current version
     */
    private getCurrentVersion($scope, $http): void {
        $http({
            method: 'GET',
            url: PanelCtrl.API.GET_CURRENT_VERSION,
        }).then((res) => {
            $scope.version = res.data.version;
            $scope.currentReleaseDate = res.data.release_date || '';
            localStorage.setItem('currentVersion', $scope.version);
            localStorage.setItem('currentReleaseDate', $scope.currentReleaseDate);
            $scope.currentVersion = localStorage.getItem('currentVersion');
            $scope.currentReleaseDate = localStorage.getItem('currentReleaseDate');
            $('#refresh').removeClass('fa-spin');
        }).catch(() => {
            $('#refresh').removeClass('fa-spin');
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
                $scope.currentReleaseDate = $scope.errorMessage ? $scope.currentReleaseDate : $scope.nextReleaseDate;
                localStorage.setItem('currentVersion', $scope.version);
                $scope.currentVersion = localStorage.getItem('currentVersion');
                $scope.isUpdated = true;
                $scope.canBeReloaded = true;
                this.setNextVersionData();
            }
            if (response.data.title === PanelCtrl.PROCESS_STATUSES.FAILED) {
                $scope.isLoaderShown = false;
                $scope.isChecked = true;
                $scope.shouldBeUpdated = true;
                $scope.canBeReloaded = true;
                $scope.errorMessage = PanelCtrl.ERRORS.UPDATE;
            }
        }).catch(() => {
            this.reset($scope);
            this.setNextVersionData();
        });
    }

    /**
     * Send request to get info about new version
     */
    private showReleaseNotes($scope) {
        // TODO: will be implemented after API release
    }

    private setNextVersionData($scope: any = false) {
        localStorage.setItem('shouldBeUpdated', !$scope ? '' : $scope.shouldBeUpdated);
        localStorage.setItem('nextVersion', !$scope ? '' : $scope.nextVersion);
        localStorage.setItem('newReleaseDate', !$scope ? '' : $scope.newReleaseDate);
        localStorage.setItem('linkVersion', !$scope ? '' : $scope.linkVersion);
        localStorage.setItem('isNoWebUpdate', !$scope ? '' : $scope.isNoWebUpdate);
        localStorage.setItem('disableUpdate', !$scope ? '' : $scope.disableUpdate);
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
        $scope.shouldBeUpdated = '';
    }
}

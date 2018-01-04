/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    static templateUrl: string = 'pmm-update-panel/index.html';
    static checkUpdateURL: string = '/configurator/v1/check-update';
    static updateURL: string = '/configurator/v1/updates';

    static PROCESS_STATUSES = {
        IN_PROGRESS: 'running',
        DONE: 'succeeded'
    };

    constructor($scope, $injector, $http) {
        super($scope, $injector);

        let location = '';

        $scope.version = '1.0.0';
        this.reset($scope);

        $scope.checkForUpdate = () => {
            $scope.waitingForResponse = true;

            $http({
                method: 'GET',
                url: PanelCtrl.checkUpdateURL,
            }).then(response => {
                $scope.waitingForResponse = false;
                $scope.shouldBeUpdated = true;
            }, error => {
                $scope.waitingForResponse = false;
                $scope.shouldBeUpdated = true; // remove

            });
        };

        $scope.toggleOutput = () => {
            $scope.showOutput = !$scope.showOutput;
        };

        $scope.update = () => {
            $scope.isUpdating = true;
            $scope.waitingForResponse = true;

            $http({
                method: 'POST',
                url: PanelCtrl.updateURL,
            }).then(response => {

                location = response.headers('Location');
                $scope.getLog();
            }, error => {
                $scope.waitingForResponse = false;
            });
        };

        $scope.getLog = () => {
            if (!location.length) return;

            $http({
                method: 'GET',
                url: location,
            }).then(response => {
                $scope.output += response.data.detail;

                if (response.data.title === PanelCtrl.PROCESS_STATUSES.IN_PROGRESS) window.setTimeout($scope.getLog, 1000);
                if (response.data.title === PanelCtrl.PROCESS_STATUSES.DONE) $scope.waitingForResponse = false;
            }, error => {});
        }
    }

    reset($scope) {
        $scope.output = '';
        $scope.showOutput = false;
        $scope.waitingForResponse = false;
        $scope.shouldBeUpdated = false;
        $scope.isUpdating = false;
    }
}

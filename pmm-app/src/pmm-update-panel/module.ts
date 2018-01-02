/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    static templateUrl: string = 'pmm-update-panel/index.html';
    static stylesUrl: string = 'pmm-update-panel/style.css';

    constructor($scope, $injector) {
        super($scope, $injector);

        $scope.version = '1.0.0';
        this.reset($scope);

        // GET Current version
        $scope.checkForUpdate = () => {
            // check if current version match with responded from server
            $scope.waitingForResponse = true;

            setTimeout(() => {
                $scope.waitingForResponse = false;
                $scope.shouldBeUpdated = true;
                $scope.$apply();
            }, 500)
            // TODO: Check for Update query
        };

        $scope.toggleFullOutput = (isFull) => {
            $scope.showFull = isFull;
        };

        $scope.update = () => {
            $scope.isUpdating = true;

            const interval = setInterval(() => {
                console.log($scope.output, $scope.showFull);
                $scope.output += ` ${Math.random()}`;
                $scope.shortOutput = $scope.output.slice($scope.output.length - 20);
                $scope.waitingForResponse = true;
                $scope.$apply();
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                $scope.version = '5.0.0';
                this.reset($scope);
                $scope.$apply();
            }, 5000);
        };

    }

    reset($scope) {
        $scope.output = '';
        $scope.shortOutput = '';
        $scope.showFull = false;
        $scope.waitingForResponse = false;
        $scope.shouldBeUpdated = false;
        $scope.isUpdating = false;
    }

    link() {
    }
}

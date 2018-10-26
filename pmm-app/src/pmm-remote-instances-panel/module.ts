/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {

    static template = `
		<iframe ng-src="{{ trustSrc(url) }}"
			style="width: 100%; height: 400px; border: 0;" scrolling="no" />
	`;

    base_url = '/qan/pmm-list';

    constructor($scope, $injector, templateSrv, $sce, $http) {
        super($scope, $injector);
        $scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);
        $scope.qanParams = {
            'theme': config.bootData.user.lightTheme ? 'light' : 'dark'
        };

        $scope.url = this.base_url + '?theme=' + $scope.qanParams.theme;
    }
}
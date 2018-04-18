/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {

	static template = `
		<iframe ng-src="{{ trustSrc(url) }}"
			style="width: 100%; height: 400px; border: 0;" scrolling="no" />
	`;

	base_url = '/qan/add-instance';

	constructor($scope, $injector, templateSrv, $sce, $http) {
		super($scope, $injector);
		$scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);
		$scope.qanParams = {
			'theme': config.bootData.user.lightTheme ? 'light' : 'dark'
		};

		$scope.url = this.base_url + '?theme=' + $scope.qanParams.theme;
	}

	link($scope, elem, attrs) {
		const frame = elem.find('iframe');
		const panel = elem.find('div.panel-container');
		const bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
		const dropdownMenu = (<any>elem[0].ownerDocument.getElementsByClassName('dropdown-menu'));

		panel.css({
			'background-color': bgcolor,
			'border': 'none'
		});

        	if (elem || elem[0]) {
            		[].forEach.call(dropdownMenu, container => container.setAttribute('style', 'z-index: 1001'));
        	}

		const setHeight = () => {
			const h = frame.contents().find('body').height() || 400;
			frame.height(h + 100 + 'px');
			panel.height(h + 150 + 'px');
		};

		frame[0].onload = (event) => frame.contents().bind(
			'DOMSubtreeModified', () => setTimeout(setHeight, 100)
		);
	}
}

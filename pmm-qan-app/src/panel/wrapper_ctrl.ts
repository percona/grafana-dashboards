/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

export class WrapperCtrl extends MetricsPanelCtrl {

	public static templateUrl = './panel/panel.html';
	base_url = '/qan/profile';

	constructor($scope, $injector, templateSrv, $sce) {

		super($scope, $injector);
		$scope.url = this.base_url;

		$scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);

		$scope.qanParams = {
			'var-host': null,
			'from': null,
			'to': null,
			'tz': 'local'
		};

		$scope.$root.onAppEvent('template-variable-value-updated', (v) => {
			$scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
		});

		$scope.$watch('ctrl.range', (newValue, oldValue) => {
			if (newValue) {
				$scope.qanParams.from = newValue.from.valueOf();
				$scope.qanParams.to = newValue.to.valueOf();
			}
		}, true);

		$scope.$watch('ctrl.dashboard.timezone', (newValue, oldValue) => {
			$scope.qanParams.tz = newValue === 'utc' ? 'utc' : 'local';
		}, true);
	}

	public encodeData(data: any): string {
		return Object.keys(data).map((key) => {
			if (data[key]) {
				return [key, data[key]].map(encodeURIComponent).join('=');
			}
		}).join('&');
	}

	link(scope, elem, attrs) {
		try {
			scope.qanParams['var-host'] = this.templateSrv.variables[0].current.value;
		} catch (e) {
			console.log('cannot set up initial host');
		}

		const frame = elem.find('#qan-iframe');
		const panel = elem.find('#qan-panel').closest('div.panel-container');
		panel.width('100%');
		panel.css({'background-color': '#141414', 'border': 'none'});

		frame[0].onload = (event) => {
			setTimeout(() => {
				frame.contents().bind('DOMSubtreeModified', function () {
					const h = frame.contents().find("body").height();
					frame.height(h + 100 + 'px');
					panel.height(h + 150 + 'px');
				});
			}, 500);
		}
		// initial url
		scope.url = this.base_url + '?' + this.encodeData(scope.qanParams);
		// updated url
		scope.$watch('qanParams', (newValue, oldValue) => {
			scope.url = this.base_url + '?' + this.encodeData(scope.qanParams);
		}, true);
	}
}

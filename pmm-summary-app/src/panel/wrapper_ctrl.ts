/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

export class WrapperCtrl extends MetricsPanelCtrl {

	public static templateUrl = './panel/panel.html';
	base_url = '/qan/sys-summary?var-host=';

	constructor($scope, $injector, templateSrv, $sce, $http) {

		super($scope, $injector);
		$scope.url = this.base_url;
		this.templateSrv = templateSrv;

		$scope.trustSrc = function (src) {
			return $sce.trustAsResourceUrl(src);
		};

		$scope.$root.onAppEvent('template-variable-value-updated', (v) => {
			$scope.url = this.base_url + templateSrv.variables[0].current.value;
		});
	}

	link(scope, elem, attrs) {
		try {
			// initial url
			scope.url = this.base_url +  this.templateSrv.variables[0].current.value;
		} catch (e) {
			console.log('cannot set up initial host');
		}

		const frame = elem.find('#percona-summary-iframe');
		const panel = elem.find('#percona-summary-panel').closest('div.panel-container');

		frame[0].onload = (event) => {
			setTimeout(() => {
				frame.contents().bind('DOMSubtreeModified', function () {
					const h = frame.contents().find('body').height();
					frame.height(h + 100 + 'px');
					panel.height(h + 150 + 'px');
				});
			}, 2000);
		}
	}
}

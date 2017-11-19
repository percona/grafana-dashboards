/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

export class PanelCtrl extends MetricsPanelCtrl {

  static template = `
    <iframe ng-src="{{ trustSrc(url) }}"
      style="width: 100%; height: 400px; border: 0;" />
  `;
  base_url = '/qan/profile';

	constructor($scope, $injector, templateSrv, $sce, $http) {
		super($scope, $injector);
    $scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);
    
    $scope.qanParams = {
			'var-host': null,
			'from': null,
			'to': null,
			'tz': 'local'
		};
    
    const setUrl = () => { // translates Grafana's variables into iframe's URL;
      $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
		};
		$scope.$root.onAppEvent('template-variable-value-updated', setUrl);
		setUrl();

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

	link($scope, elem, attrs) {
		const frame = elem.find('iframe');
		const panel = elem.find('div.panel-container');
		panel.css({'background-color': '#141414', 'border': 'none'});
		frame[0].onload = (event) => {
			frame.contents().bind('DOMSubtreeModified', () => {
				const h = frame.contents().find('body').height();
				frame.height(h + 100 + 'px');
				panel.height(h + 150 + 'px');
			});
    }
    
    // initial url
		$scope.url = this.base_url + '?' + this.encodeData($scope.qanParams);
		// updated url
		$scope.$watch('qanParams', (newValue, oldValue) => {
			$scope.url = this.base_url + '?' + this.encodeData($scope.qanParams);
		}, true);
	}
}

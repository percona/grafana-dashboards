/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

export class PanelCtrl extends MetricsPanelCtrl {

	static template = `
		<iframe src="/qan/add-instance"
			style="width: 100%; height: 400px; border: 0;" />
	`;

	constructor($scope, $injector, templateSrv, $sce, $http) {
		super($scope, $injector);
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
	}
}

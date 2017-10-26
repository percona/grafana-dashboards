/// <reference path="../../headers/common.d.ts" />

import { PanelCtrl } from 'app/plugins/sdk';

export class WrapperCtrl extends PanelCtrl {

	public static templateUrl = './panel/panel.html';
	
	constructor($scope, $injector, templateSrv, $sce) {
		super($scope, $injector);
	}
}

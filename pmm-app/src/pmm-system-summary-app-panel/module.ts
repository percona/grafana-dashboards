/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {

	static template = `
		<iframe ng-src="{{ trustSrc(url) }}"
			style="width: 100%; height: 400px; border: 0;" scrolling="no" />
	`;
  base_url = '/qan/sys-summary?var-host=';

	constructor($scope, $injector, templateSrv, $sce, $http) {
		super($scope, $injector);
		$scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);
		$scope.qanParams = {
			'theme': config.bootData.user.lightTheme ? 'light' : 'dark'
		};

		const setUrl = () => { // translates Grafana's variables into iframe's URL;
			$scope.url = this.base_url + templateSrv.variables[0].current.value;
			$scope.url += '&theme=' + $scope.qanParams.theme;
		};
		$scope.$root.onAppEvent('template-variable-value-updated', setUrl);
		setUrl();
	}

	link($scope, elem) {
		const frame = elem.find('iframe');
		const panel = elem.find('div.panel-container');
        const panelContent = elem.find('div.panel-content');

        panel.css({
            'background-color': 'transparent',
            'border': 'none'
        });

        this.disableGrafanaPerfectScroll(elem);
        this.fixMenuVisibility(elem);

        $scope.ctrl.calculatePanelHeight = () => {
            const h = frame.contents().find('body').height() || 400;
            const documentH = (elem && elem[0]) ? elem[0].ownerDocument.height : h;

            $scope.ctrl.containerHeight = documentH;
            $scope.ctrl.height = documentH - 100;

            frame.height(`${h + 100}px`);
            panel.height(`${h + 150}px`);

            panelContent.height(`inherit`);
        };

        frame.on('load', () => {
            $scope.ctrl.calculatePanelHeight();
            frame.contents().bind('click', () => setTimeout(() => $scope.ctrl.calculatePanelHeight(), 10));
            frame.contents().bind('DOMSubtreeModified', () => setTimeout(() => $scope.ctrl.calculatePanelHeight(), 10));
        });
    }

    /**
     * Workaround for scrolling through iframe
     * Grafana perfect scroll is broken for iframe and should be disabled for this case
     * @param elem - qan app panel HTML element
     * @returns {void, boolean}
     */
    private disableGrafanaPerfectScroll(elem): void | boolean {
        if (!elem || !elem[0]) return false;

        const perfectScrollContainers = (<any>elem[0].ownerDocument.getElementsByClassName('ps'));
        const rightScrollbarContainers = (<any>elem[0].ownerDocument.getElementsByClassName('ps__thumb-y'));

        [].forEach.call(perfectScrollContainers, container => container.setAttribute('style', 'overflow: auto !important'));
        [].forEach.call(rightScrollbarContainers, container => container.setAttribute('style', 'display: none !important'));
    }

    private fixMenuVisibility(elem): void | boolean {
        if (!elem || !elem[0]) return false;

        const menu = (<any>elem[0].ownerDocument.getElementsByClassName('dropdown-menu'));

        [].forEach.call(menu, e => e.setAttribute('style', 'z-index: 1001'));
    }
}

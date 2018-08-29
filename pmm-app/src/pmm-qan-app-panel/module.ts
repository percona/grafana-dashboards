/// <reference path="../../headers/common.d.ts" />

import {MetricsPanelCtrl} from 'app/plugins/sdk';
import config from 'app/core/config';
import $ from 'jquery';

export class PanelCtrl extends MetricsPanelCtrl {
    static template = `<iframe ng-src="{{trustSrc(url)}}" style="width: 100%; height: 400px; border: 0;" scrolling="no" />`;

    constructor($scope, $injector, templateSrv, $sce) {
        super($scope, $injector);
        $scope.qanParams = {
            'var-host': null,
            'from': null,
            'search': '',
            'queryID': null,
            'type': null,
            'to': null,
            'tz': config.bootData.user.timezone,
            'theme': config.bootData.user.lightTheme ? 'light' : 'dark'
        };
        $scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);

        this.setUrl($scope, templateSrv);

        $scope.$root.onAppEvent('template-variable-value-updated', this.setUrl.bind(this, $scope, templateSrv));

        $scope.$watch('ctrl.range', newValue => {
            if (!newValue) return;

            $scope.qanParams.from = newValue.from.valueOf();
            $scope.qanParams.to = newValue.to.valueOf();
        }, true);
    }

    link($scope, elem, $location, $window) {
        const frame = elem.find('iframe');
        const panel = elem.find('div.panel-container');
        const panelContent = elem.find('div.panel-content');
        // TODO: investigate this workaround. Inside $window - CtrlPanel
        const location = $window.$injector.get('$location');
        const window = $window.$injector.get('$window');

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
            panelContent[0].style.padding = '0 0 10px';
        };
        // init url
        // updated url
        $scope.$watch('qanParams', this.resetUrl.bind(this, $scope), true);

        [$scope.qanParams.queryID, $scope.qanParams.type, $scope.qanParams.search] = this.retrieveDashboardURLParams(location.absUrl());

        frame.on('load', () => {
            frame.contents().bind('click', event => {
                const [queryID, type, search] = this.retrieveIFrameURLParams(event.currentTarget.URL);
                $scope.ctrl.calculatePanelHeight();
                return queryID === 'null' || queryID === null || this.reloadQuery(window, queryID, type, search);
            });
            frame.contents().bind('keyup', event => {
                if ($(event.target).is('#search-input') && event.keyCode === 13) {
                    const [queryID, type, search] = this.retrieveIFrameURLParams(event.currentTarget.URL);
                    $scope.ctrl.calculatePanelHeight();
                    return this.reloadQuery(window, queryID, type, search);
                }
            });
            frame.contents().bind('DOMSubtreeModified', $scope.ctrl.calculatePanelHeight);
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

    private reloadQuery(window, queryID = null, type = null, search = '') {
        const isIDInUrl = queryID && (!search || search === 'null');
        const isSearchInUrl = search && (search !== null) && (!queryID || queryID === 'null');
        const isBothInUrl = queryID && search;

        const conditions = [
            {
                getStr: () => '&queryID',
                params: {queryID, type},
                getCondition: () => isIDInUrl
            },
            {
                getStr: () => (window.location.href.match(/&queryID/g) || []).length ? '&queryID' : '&search',
                params: {search},
                getCondition: () => isSearchInUrl
            },
            {
                getStr: () => '&queryID',
                params: {queryID, type, search},
                getCondition: () => isBothInUrl
            },
            {
                getStr: () => '&search',
                params: {queryID, type, search},
                getCondition: () => isBothInUrl && ((window.location.href.match(/&search/g) || []).length > 1)
            },
        ];

        conditions.map(item => {
            if (!item.getCondition()) return;
            history.pushState({}, null, `${window.location.href.split(item.getStr())[0]}&${this.encodeData(item.params)}`);
        })
    }

    private retrieveDashboardURLParams(url): Array<string> {
        const currentURL = new URL(url);

        return [currentURL.searchParams.get('queryID'), currentURL.searchParams.get('type'), currentURL.searchParams.get('search')];
    }

    private retrieveIFrameURLParams(url): Array<string> {
        const currentURL = new URL(url);
        const id = currentURL.searchParams.get('queryID');
        const search = currentURL.searchParams.get('search');
        const urlArr = url.split('/');
        const type = urlArr[urlArr.length - 1].split('?')[0];

        return [id, type, search];
    }

    private encodeData(data: Object): string {
        return Object.keys(data)
            .map(key => data.hasOwnProperty(key) ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : null)
            .join('&');
    }

    // translates Grafana's variables into iframe's URL;
    private setUrl($scope, templateSrv) {
        $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
    }

    private resetUrl($scope) {
        let data = this.encodeData($scope.qanParams);

        if ($scope.qanParams.type && $scope.qanParams.queryID) $scope.url = `/qan/profile/report/${$scope.qanParams.type}?${data}`;
        else $scope.url = `/qan/profile/?${data}`;
    }
}

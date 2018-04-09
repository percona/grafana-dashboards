/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    static template = `<iframe ng-src="{{trustSrc(url)}}" style="width: 100%; height: 400px; border: 0;" scrolling="no" />`;

    constructor($scope, $injector, templateSrv, $sce) {

        super($scope, $injector);
        $scope.qanParams = {
            'var-host': null,
            'from': null,
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
        const bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
        // TODO: investigate this workaround. Inside $window - CtrlPanel
        const location = $window.$injector.get('$location');
        const window = $window.$injector.get('$window');
        panel.css({
            'background-color': bgcolor,
            'border': 'none'
        });

        // init url
        // updated url
        $scope.$watch('qanParams', this.resetUrl.bind(this, $scope), true);

        [$scope.qanParams.queryID, $scope.qanParams.type] = this.retrieveDashboardURLParams(location.absUrl());

        frame.on('load', () => {
            frame.contents().bind('click', event => {
                const [queryID, type] = this.retrieveIFrameURLParams(event.currentTarget.URL);
                this.reloadQuery(window, queryID, type)
            });

            frame.contents().bind('DOMSubtreeModified', () => setTimeout(() => {
                    const h = frame.contents().find('body').height() || 400;
                    frame.height(`${h + 100}px`);
                    panel.height(`${h + 150}px`);
                    panelContent.height(`inherit`);
                }, 100)
            )
        });
    }

    private reloadQuery(window, queryID = null, type = null) {
        const url = `${window.location.href.split('&queryID')[0]}&${this.encodeData({queryID, type})}`;

        history.pushState({}, null, url);
    }

    private retrieveDashboardURLParams(url): Array<string> {
        const currentURL = new URL(url);

        return [currentURL.searchParams.get('queryID'), currentURL.searchParams.get('type')];
    }

    private retrieveIFrameURLParams(url): Array<string> {
        const currentURL = new URL(url);
        const id = currentURL.searchParams.get('queryID');
        const urlArr = url.split('/');
        const type = urlArr[urlArr.length - 1].split('?')[0];

        return [id, type];
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

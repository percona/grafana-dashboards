import {MetricsPanelCtrl} from 'app/plugins/sdk';
import config from 'app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
    static template = `<iframe ng-src="{{trustSrc(url)}}" style="width: 100%; height: 400px; border: 0;" scrolling="no" />`;

    constructor($scope, $injector, templateSrv, $sce) {
        super($scope, $injector);

        $scope.qanParams = {
            'var-host': null,
            'from': null,
            'queryID': null,
            'type': 'mySQL',
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

    link($scope, elem) {
        const frame = elem.find('iframe');
        const panel = elem.find('div.panel-container');
        const bgcolor = $scope.qanParams.theme === 'light' ? '#ffffff' : '#141414';
        panel.css({
            'background-color': bgcolor,
            'border': 'none'
        });

        // init url
        this.resetUrl($scope);
        // updated url
        $scope.$watch('qanParams', this.resetUrl.bind(this, $scope), true);

        frame.on('load', () => frame.contents().bind('DOMSubtreeModified', event => {
                const h = frame.contents().find('body').height() || 400;
                frame.height(`${h + 100}px`);
                panel.height(`${h + 150}px`);
            }
        ));
    }


    private encodeData(data: Object): string {
        return Object.keys(data)
            .map(key => data[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}` : null)
            .join('&');
    }

    // translates Grafana's variables into iframe's URL;
    private setUrl($scope, templateSrv) {
        $scope.qanParams['var-host'] = templateSrv.variables[0].current.value;
    }

    private resetUrl($scope) {
        $scope.url = `/qan/profile?${this.encodeData($scope.qanParams)}`;
    }
}

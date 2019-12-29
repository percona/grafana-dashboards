import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import config from 'grafana/app/core/config';
import AppEvents from 'grafana/app/core/app_events';
import _ from 'lodash';

const filtersList = [
  'var-agent_id',
  'var-az',
  'var-database',
  'var-host',
  'var-environment',
  'var-replication_set',
  'var-region',
  'var-cluster',
  'var-node_id',
  'var-node_name',
  'var-node_type',
  'var-node_model',
  'var-service',
  'var-service_id',
  'var-service_name',
  'var-service_type',
  'var-username',
];

export class PanelCtrl extends MetricsPanelCtrl {
  static template = `<iframe ng-src="{{trustSrc(url)}}" id="iframe-qan" style="width: 100%; height: 400px; border: 0;" scrolling="no" />`;

  /** @ngInject */
  constructor($scope, $injector, templateSrv, $sce) {
    super($scope, $injector);
    $scope.qanParams = {
      'var-host': null,
      from: '',
      to: '',
      search: '',
      queryID: '',
      type: '',
      tz: config.bootData.user.timezone,
      theme: config.bootData.user.lightTheme ? 'light' : 'dark',
      filters: '',
      main_metric: '',
      columns: '',
      order_by: '',
      group_by: '',
      filter_by: '',
      active_details_tab: '',
    };
    $scope.trustSrc = src => $sce.trustAsResourceUrl(src);

    $scope.$watch(
      'ctrl.range',
      newValue => {
        if (!newValue) {
          return;
        }
        [
          $scope.qanParams.queryID,
          $scope.qanParams.type,
          $scope.qanParams.search,
          $scope.qanParams.filters,
          $scope.qanParams.main_metric,
          $scope.qanParams.columns,
          $scope.qanParams.order_by,
          $scope.qanParams.group_by,
          $scope.qanParams.filter_by,
          $scope.qanParams.active_details_tab,
        ] = this.retrieveDashboardURLParams();
        $scope.qanParams.from = newValue.raw.from;
        $scope.qanParams.to = newValue.raw.to;
        this.resetUrl($scope);
      },
      true
    );
  }

  link($scope, elem, $location, $window) {
    const frame = elem.find('iframe');
    const panel = elem.find('div.panel-container');
    const panelContent = elem.find('div.panel-content');
    // TODO: investigate this workaround. Inside $window - CtrlPanel
    const window = $window.$injector.get('$window');
    panel.css({
      'background-color': 'transparent',
      border: 'none',
    });

    this.disableGrafanaPerfectScroll(elem);
    this.fixMenuVisibility(elem);

    $scope.ctrl.calculatePanelHeight = () => {
      const h =
        frame
          .contents()
          .find('body')
          .height() || 400;
      const documentH = elem && elem[0] ? elem[0].ownerDocument.height : h;

      $scope.ctrl.containerHeight = documentH;
      $scope.ctrl.height = documentH - 100;

      frame.height(`${h + 100}px`);
      panel.height(`${h + 150}px`);

      panelContent.height(`inherit`);
      panelContent[0].style.padding = '0 0 10px';
    };
    // init url
    // updated url
    // $scope.$watch('qanParams', this.resetUrl.bind(this, $scope), true);
    [
      $scope.qanParams.queryID,
      $scope.qanParams.type,
      $scope.qanParams.search,
      $scope.qanParams.filters,
      $scope.qanParams.main_metric,
      $scope.qanParams.columns,
      $scope.qanParams.order_by,
      $scope.qanParams.group_by,
      $scope.qanParams.filter_by,
      $scope.qanParams.active_details_tab,
    ] = this.retrieveDashboardURLParams();

    frame.on('load', () => {
      setTimeout(() => $scope.ctrl.calculatePanelHeight(), 10);

      frame.contents().bind('updateUrl', event => {
        const [type, params] = this.retrieveIFrameURLParams(event.currentTarget.URL);
        this.reloadQuery(window, $scope, type, params);
        setTimeout(() => $scope.ctrl.calculatePanelHeight(), 10);
      });

      frame.contents().bind(
        'showSuccessNotification',
        () => {
          AppEvents.emit('alert-success', ['Content has been copied to clipboard']);
        },
        false
      );

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
    if (!elem || !elem[0]) {
      return false;
    }

    const perfectScrollContainers = elem[0].ownerDocument.getElementsByClassName('ps') as any;
    const rightScrollbarContainers = elem[0].ownerDocument.getElementsByClassName('ps__thumb-y') as any;

    [].forEach.call(perfectScrollContainers, (container: HTMLElement) => container.setAttribute('style', 'overflow: auto !important'));
    [].forEach.call(rightScrollbarContainers, (container: HTMLElement) => container.setAttribute('style', 'display: none !important'));
  }

  private fixMenuVisibility(elem): void | boolean {
    if (!elem || !elem[0]) {
      return false;
    }

    const menu = elem[0].ownerDocument.getElementsByClassName('dropdown-menu') as any;

    [].forEach.call(menu, (e: HTMLElement) => e.setAttribute('style', 'z-index: 1001'));
  }

  // TODO: add strict urlParams presence check
  private reloadQuery(window, $scope, type = '', urlParams: {}) {
    const existedParams = this.getJsonFromUrl(window.location);

    [...Object.keys(existedParams), ...Object.keys(urlParams)].forEach(param => {
      if (urlParams[param]) {
        existedParams[param] = urlParams[param];
      } else if (existedParams[param] && !urlParams[param] && filtersList.includes(param)) {
        existedParams[param] = ['All'];
      }
    });
    if (type && urlParams['queryID']) {
      existedParams['type'] = type;
    }
    const templateVariables = this.templateSrv.variables;
    filtersList.forEach(filter => {
      if (!existedParams[filter]) {
        return;
      }
      const variables = _.find(templateVariables, { name: filter.replace('var-', '') });
      variables.current = {
        text: existedParams[filter],
        value: existedParams[filter],
      };
    });
    templateVariables[0].variableSrv.variableUpdated(templateVariables[0], true);
  }

  private retrieveDashboardURLParams(): string[] {
    const currentURL = new URL(window.location.href);
    const id = currentURL.searchParams.get('queryID') ? currentURL.searchParams.get('queryID') : '';
    const search = currentURL.searchParams.get('search') ? currentURL.searchParams.get('search') : '';
    const filters = this.retrieveFiltersFromVarParams(currentURL);
    const mainMetric = currentURL.searchParams.get('main_metric') ? currentURL.searchParams.get('main_metric') : '';
    const columns = currentURL.searchParams.get('columns') ? currentURL.searchParams.get('columns') : '';
    const orderBy = currentURL.searchParams.get('order_by') ? currentURL.searchParams.get('order_by') : '';
    const groupBy = currentURL.searchParams.get('group_by') ? currentURL.searchParams.get('group_by') : '';
    const filterBy = currentURL.searchParams.get('filter_by') ? currentURL.searchParams.get('filter_by') : '';
    const activeDetailsTab = currentURL.searchParams.get('active_details_tab') ? currentURL.searchParams.get('active_details_tab') : '';
    const type = currentURL.searchParams.get('type') ? currentURL.searchParams.get('type') : '';
    // @ts-ignore
    return [id, type, search, filters, mainMetric, columns, orderBy, groupBy, filterBy, activeDetailsTab];
  }

  private retrieveFiltersFromVarParams(currentURL) {
    return filtersList
      .reduce((list, filter) => {
        PanelCtrl.retrieveVarParam(currentURL, list, filter);
        return list;
      }, [])
      .join('&');
  }

  private static retrieveVarParam(currentURL, filtersFromVar, param: string) {
    if (currentURL.searchParams.get(param) && currentURL.searchParams.get(param) !== 'All') {
      const params = currentURL.searchParams.getAll(param);
      params.forEach(x => filtersFromVar.push(`${param}=${x}`));
    }
  }

  private retrieveIFrameURLParams(url) {
    const currentURL = new URL(url);
    const params = this.getJsonFromUrl(currentURL);
    const urlArr = url.split('/');
    const type = urlArr[urlArr.length - 1].split('?')[0];

    return [type, params];
  }

  private getJsonFromUrl(url: URL) {
    const query = url.search.substr(1);
    const result = {};
    query.split('&').forEach(part => {
      const item = part.split('=');
      if (result[item[0]]) {
        result[item[0]].push(decodeURIComponent(item[1]));
      } else {
        result[item[0]] = [decodeURIComponent(item[1])];
      }
      // = decodeURIComponent(item[1]);
    });
    return result;
  }

  private encodeData(data: {}): string {
    return Object.keys(data)
      .map(key => {
        if (data.hasOwnProperty(key) && data[key]) {
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        }
        return null;
      })
      .filter(param => param)
      .join('&');
  }

  private resetUrl($scope) {
    const filters = $scope.qanParams.filters;
    const data = Object.assign({}, $scope.qanParams);
    delete data.filters;
    const query = this.encodeData(data);
    $scope.url =
      $scope.qanParams.type && $scope.qanParams.queryID
        ? `/qan/profile/report/${$scope.qanParams.type}?${query}&${filters}`
        : `/qan/profile/?${query}&${filters}`;
  }
}

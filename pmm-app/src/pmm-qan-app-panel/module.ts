/// <reference path="../../headers/common.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';
import config from 'app/core/config';
import AppEvents from 'app/core/app_events';

export class PanelCtrl extends MetricsPanelCtrl {
  static template = `<iframe ng-src="{{trustSrc(url)}}" id="iframe-qan" style="width: 100%; height: 400px; border: 0;" scrolling="no" />`;

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
    const location = $window.$injector.get('$location');
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
    ] = this.retrieveDashboardURLParams(location.absUrl());

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
    const host = window.location.href.split('?')[0];
    const existedParams = this.getJsonFromUrl(window.location);
    Object.keys(urlParams).forEach(param => (existedParams[param] = urlParams[param]));

    if (type && urlParams['queryID']) {
      existedParams['type'] = type;
    }
    const queryParams = Object.keys(existedParams)
      .map(param => `${param}=${existedParams[param] || ''}`)
      .join('&');
    const url = `${host}?${queryParams}`;
    // @ts-ignore
    history.pushState({}, null, url);
    Object.keys(existedParams).forEach(param => ($scope.qanParams[param] = existedParams[param]));
  }

  private retrieveDashboardURLParams(url): string[] {
    const currentURL = new URL(url);
    const id = currentURL.searchParams.get('queryID') ? currentURL.searchParams.get('queryID') : '';
    const search = currentURL.searchParams.get('search') ? currentURL.searchParams.get('search') : '';
    const filters = currentURL.searchParams.get('filters') ? currentURL.searchParams.get('filters') : this.retrieveFiltersFromVarParams(currentURL);
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
    const filtersFromVar = [];
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-host', 'node_name');
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-service', 'service_name');
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-db', 'database');
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-replication_set', 'replication_set');
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-environment', 'environment');
    PanelCtrl.retrieveVarParam(currentURL, filtersFromVar, 'var-cluster', 'cluster');
    return filtersFromVar.join(',');
  }

  private static retrieveVarParam(currentURL, filtersFromVar, param: string, key: string) {
    if (currentURL.searchParams.get(param) && currentURL.searchParams.get(param) !== 'All') {
      const params = currentURL.searchParams.getAll(param);
      params.forEach(x => {
        filtersFromVar.push(key + ':' + x);
      });
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
      result[item[0]] = decodeURIComponent(item[1]);
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
    const data = this.encodeData($scope.qanParams);

    $scope.url = $scope.qanParams.type && $scope.qanParams.queryID ? `/qan/profile/report/${$scope.qanParams.type}?${data}` : `/qan/profile/?${data}`;
  }
}

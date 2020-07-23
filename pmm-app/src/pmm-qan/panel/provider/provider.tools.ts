import { getDataSourceSrv } from '@grafana/runtime';
import { find } from 'lodash';
import { ParseQueryParamDate } from 'shared/components/helpers/time-parameters-parser';
import { DEFAULT_COLUMNS, FILTERS_NAMES, DEFAULT_PAGE_SIZE } from '../QueryAnalytics.constants';

const setFilters = (query) => FILTERS_NAMES.reduce((acc, filterName) => {
  const filters = query.getAll(`var-${filterName}`);

  if (!filters.length) {
    return acc;
  }

  acc[filterName] = filters;

  return acc;
}, {});

export const refreshGrafanaVariables = (state) => {
  const dataSource = getDataSourceSrv();
  const templateVariables = (dataSource as any).templateSrv.variables;

  FILTERS_NAMES.forEach((filter) => {
    const variables = find(templateVariables, { name: filter.replace('var-', '') });

    if (!variables) {
      return;
    }

    variables.current = {
      text: state.labels[filter] || ['All'],
      value: state.labels[filter] || ['All'],
    };
  });
  templateVariables[0].variableSrv.variableUpdated(templateVariables[0]);
};

export const getLabelsUrlString = (labels) => Object.keys(labels)
  .map((key) => {
    const variables = labels[key];

    return variables.map((variable) => `var-${key}=${variable === 'na' ? '' : variable}`).join('&');
  })
  .filter(Boolean)
  .join('&');
export const generateURL = (state) => {
  // read parameters and create new url
  const {
    labels, columns, groupBy, queryId, orderBy, rawTime
  } = state;
  const urlLabels = getLabelsUrlString(labels);
  const urlColumnsQuery = columns ? `columns=${JSON.stringify(columns)}` : '';
  const urlGroupBy = groupBy ? `group_by=${groupBy}` : '';
  const urlFilterByQuery = queryId ? `filter_by=${queryId}` : '';
  const urlOrderBy = orderBy ? `order_by=${orderBy}` : '';
  const urlFrom = rawTime && rawTime.from ? `from=${rawTime.from}` : '';
  const urlTo = rawTime && rawTime.to ? `to=${rawTime.to}` : '';
  const totals = `totals=${state.totals}`;
  const querySelected = state.querySelected ? `query_selected=${state.querySelected}` : '';
  const openDetailsTab = state.openDetailsTab ? `details_tab=${state.openDetailsTab}` : '';

  const uriQueryParams = [
    urlColumnsQuery,
    urlFilterByQuery,
    urlLabels,
    urlOrderBy,
    urlGroupBy,
    urlFrom,
    urlTo,
    totals,
    querySelected,
    openDetailsTab,
  ]
    .filter(Boolean)
    .join('&');

  // TODO: replace crutch with right redirect
  return encodeURI(`${window.location.pathname}?${uriQueryParams}`);
};
export const parseURL = (query) => ({
  from: ParseQueryParamDate.transform(query.get('from') || 'now-12h', 'from'),
  to: ParseQueryParamDate.transform(query.get('to') || 'now', 'to')
    .utc()
    .format('YYYY-MM-DDTHH:mm:ssZ'),
  columns: JSON.parse(query.get('columns')) || DEFAULT_COLUMNS,
  labels: setFilters(query),
  pageNumber: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  orderBy: query.get('order_by') || `-${(JSON.parse(query.get('columns')) || DEFAULT_COLUMNS)[0]}`,
  queryId: query.get('filter_by'),
  totals: query.get('totals') === 'true',
  querySelected: !!query.get('filter_by') || query.get('query_selected') === 'true',
  groupBy: query.get('group_by') || 'queryid',
  openDetailsTab: query.get('details_tab') || 'details',
});
export const setLabels = (filters) => Object.keys(filters)
  .filter((filter) => filters[filter])
  .reduce((labels, filter) => {
    const [group, value] = filter.split(':');

    // TODO: using '--' because final form think that it is a nested fields
    //  need to replace it with something better
    if (labels[group]) {
      labels[group].push(value.replace(/--/gi, '.').replace(/^na$/, ''));
    } else {
      // eslint-disable-next-line no-param-reassign
      labels[group] = [value.replace(/--/gi, '.').replace(/^na$/, '')];
    }

    return labels;
  }, {});

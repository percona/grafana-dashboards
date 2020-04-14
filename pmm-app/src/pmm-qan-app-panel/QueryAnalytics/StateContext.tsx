import React, { useEffect, useState } from 'react';
import { ParseQueryParamDate } from '../../react-plugins-deps/components/helpers/time-parameters-parser';
import { getDataSourceSrv } from '@grafana/runtime';
import { find } from 'lodash';

const initialState = {} as any;

export const StateContext = React.createContext(initialState);

const DEFAULT_COLUMNS = ['load', 'num_queries', 'query_time'];
const FILTERS_NAMES = [
  'environment',
  'cluster',
  'replication_set',
  'database',
  'schema',
  'node_name',
  'service_name',
  'client_host',
  'username',
  'service_type',
  'node_type',
  'city',
  'az',
];

const setFilters = query =>
  FILTERS_NAMES.reduce((result, filterName) => {
    const filters = query.getAll(`var-${filterName}`);
    if (!filters.length) {
      return result;
    }

    if (filters[0] === 'All' || filters[0] === '') {
      return result;
    }

    result[filterName] = filters;
    return result;
  }, {});

const refreshGrafanaVariables = state => {
  const dataSource = getDataSourceSrv();
  // @ts-ignore
  const templateVariables = dataSource.templateSrv.variables;
  FILTERS_NAMES.forEach(filter => {
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

const generateURL = state => {
  // read parameters and create new url
  const { labels, columns, groupBy, queryId, orderBy } = state;
  // @ts-ignore
  const urlLabels =
    labels &&
    Object.keys(labels)
      .map(key => {
        // @ts-ignore
        const variables = labels[key];
        return variables.map(variable => `var-${key}=${variable}`).join('&');
      })
      .filter(Boolean)
      .join('&');
  const urlColumnsQuery = columns ? `columns=${JSON.stringify(columns)}` : '';
  const urlGroupBy = groupBy ? `group_by=${groupBy}` : '';
  const urlFilterByQuery = queryId ? `filter_by=${queryId}` : '';
  const urlOrderBy = orderBy ? `order_by=${orderBy}` : '';
  const urlFrom = state.rawTime && state.rawTime.from ? `from=${state.rawTime.from}` : '';
  const urlTo = state.rawTime && state.rawTime.to ? `to=${state.rawTime.to}` : '';
  // TODO: replace crutch with right redirect
  return `${window.location.pathname}?${[
    urlColumnsQuery,
    urlFilterByQuery,
    urlLabels,
    urlOrderBy,
    urlGroupBy,
    urlFrom,
    urlTo,
  ]
    .filter(Boolean)
    .join('&')}`;
};

const parseURL = query => ({
  from: ParseQueryParamDate.transform(query.get('from') || 'now-12h', 'from'),
  to: ParseQueryParamDate.transform(query.get('to') || 'now', 'to')
    .utc()
    .format('YYYY-MM-DDTHH:mm:ssZ'),
  columns: JSON.parse(query.get('columns')) || DEFAULT_COLUMNS,
  labels: setFilters(query),
  pageNumber: 1,
  pageSize: 10,
  orderBy: query.get('order_by') || `-${(JSON.parse(query.get('columns')) || DEFAULT_COLUMNS)[0]}`,
  queryId: query.get('filter_by'),
  querySelected: !!query.get('filter_by'),
  groupBy: query.get('group_by') || 'queryid',
});

const setLabels = filters =>
  Object.keys(filters)
    .filter(filter => filters[filter])
    .reduce((labels, filter) => {
      const [group, value] = filter.split(':');
      // TODO: using '--' because final form think that it is a nested fields
      //  need to replace it with something better
      if (labels[group]) {
        labels[group].push(value.replace(/\-\-/gi, '.'));
      } else {
        labels[group] = [value.replace(/\-\-/gi, '.')];
      }
      return labels;
    }, {});

const actions = {
  setLabels: value => state => {
    const newState = { ...state, labels: setLabels(value), pageNumber: 1 };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  resetLabels: value => state => {
    const newState = { ...state, labels: {}, pageNumber: 1 };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  selectQuery: value => state => {
    return { ...state, queryId: value || 'TOTAL', querySelected: true };
  },
  addColumn: value => state => {
    const columns = [...state.columns];
    columns.push(value);
    return {
      ...state,
      columns,
    };
  },
  changeColumn: value => state => {
    const columns = [...state.columns];
    columns[columns.indexOf(value.oldColumn.simpleName)] = value.column;
    return {
      ...state,
      columns,
      orderBy:
        value.oldColumn.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
  },
  removeColumn: value => state => {
    const columns = [...state.columns];
    columns.splice(columns.indexOf(value.simpleName), 1);
    return {
      ...state,
      columns,
      orderBy: value.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
  },
  changePage: value => state => {
    const newState = {
      ...state,
      pageNumber: value,
    };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  changePageSize: value => state => {
    const newState = {
      ...state,
      pageSize: value,
      pageNumber: 1,
    };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  changeSort: value => state => {
    let newOrderBy = '';

    if (value === state.orderBy) {
      newOrderBy = `-${value}`;
    } else if (`-${value}` === state.orderBy) {
      newOrderBy = `${value}`;
    } else {
      newOrderBy = `-${value}`;
    }

    const newState = {
      ...state,
      orderBy: newOrderBy,
      pageNumber: 1,
    };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  changeGroupBy: value => state => {
    const newState = {
      ...state,
      groupBy: value,
      querySelected: false,
      pageNumber: 1,
    };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  setFingerprint: value => state => {
    return {
      ...state,
      fingerprint: value,
    };
  },
};

export const UrlParametersProvider = ({ grafanaProps, children }) => {
  const query = new URLSearchParams(window.location.search);
  const rawTime = { ...grafanaProps.timeRange.raw };
  const from = grafanaProps.timeRange.from.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  const to = grafanaProps.timeRange.to.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  const [panelState, setContext] = useState({
    ...parseURL(query),
    rawTime,
  });

  useEffect(() => {
    refreshGrafanaVariables(panelState);
    const newUrl = generateURL(panelState);
    history.pushState({}, 'test', newUrl);
  }, [panelState]);

  const wrapAction = key => value => {
    return setContext(actions[key](value));
  };

  useEffect(() => {
    const newState = { ...panelState, from, to, rawTime, pageNumber: 1 };
    delete newState.queryId;
    delete newState.querySelected;
    setContext(newState);
  }, [from, to]);

  return (
    <StateContext.Provider
      value={{
        panelState: panelState,
        contextActions: Object.keys(actions).reduce((actions, key) => {
          actions[key] = wrapAction(key);
          return actions;
        }, {}),
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

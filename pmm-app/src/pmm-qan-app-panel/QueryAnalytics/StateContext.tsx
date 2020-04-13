import React, { useEffect, useState } from 'react';
import { ParseQueryParamDate } from '../../react-plugins-deps/components/helpers/time-parameters-parser';
import { getDataSourceSrv } from '@grafana/runtime';
import _ from 'lodash';

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

class ContextActions {
  constructor() {}

  static setFilters(query) {
    return FILTERS_NAMES.reduce((result, filterName) => {
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
  }

  static refreshGrafanaVariables(state) {
    const dataSource = getDataSourceSrv();
    // @ts-ignore
    const templateVariables = dataSource.templateSrv.variables;
    FILTERS_NAMES.forEach(filter => {
      const variables = _.find(templateVariables, { name: filter.replace('var-', '') });
      if (!variables) {
        return;
      }
      variables.current = {
        text: state.labels[filter] || ['All'],
        value: state.labels[filter] || ['All'],
      };
    });
    templateVariables[0].variableSrv.variableUpdated(templateVariables[0]);
  }

  static generateURL(state) {
    // read parameters and create new url
    // @ts-ignore
    const labels =
      state.labels &&
      Object.keys(state.labels)
        .map(key => {
          // @ts-ignore
          const variables = state.labels[key];
          return variables.map(variable => `var-${key}=${variable}`).join('&');
        })
        .filter(Boolean)
        .join('&');
    const columnsQuery = state.columns ? `columns=${JSON.stringify(state.columns)}` : '';
    const groupBy = state.groupBy ? `group_by=${state.groupBy}` : '';
    const filterByQuery = state.queryId ? `filter_by=${state.queryId}` : '';
    const orderBy = state.orderBy ? `order_by=${state.orderBy}` : '';
    const from = state.rawTime && state.rawTime.from ? `from=${state.rawTime.from}` : '';
    const to = state.rawTime && state.rawTime.to ? `to=${state.rawTime.to}` : '';
    // TODO: replace crutch with right redirect
    return `${window.location.pathname}?${[columnsQuery, filterByQuery, labels, orderBy, groupBy, from, to]
      .filter(Boolean)
      .join('&')}`;
  }

  static parseURL(query) {
    const urlParams = {} as any;
    urlParams.from = ParseQueryParamDate.transform(query.get('from') || 'now-12h', 'from')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ssZ');
    urlParams.to = ParseQueryParamDate.transform(query.get('to') || 'now', 'to')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ssZ');
    // urlParams.rawTime = {
    //   from: query.get('from'),
    //   to: query.get('to'),
    // };
    urlParams.columns = JSON.parse(query.get('columns')) || DEFAULT_COLUMNS;
    urlParams.labels = ContextActions.setFilters(query);
    urlParams.pageNumber = 1;
    urlParams.pageSize = 10;
    urlParams.orderBy = query.get('order_by') || `-${urlParams.columns[0]}`;
    urlParams.queryId = query.get('filter_by');
    urlParams.querySelected = !!query.get('filter_by');
    urlParams.groupBy = query.get('group_by') || 'queryid';
    // console.log(Object.assign({}, urlParams));
    return urlParams;
  }

  static setLabels(filters) {
    const labels = {};
    Object.keys(filters)
      .filter(filter => filters[filter])
      .forEach(filter => {
        const [group, value] = filter.split(':');
        // TODO: using '--' because final form think that it is a nested fields
        //  need to replace it with something better
        if (labels[group]) {
          labels[group].push(value.replace(/\-\-/gi, '.'));
        } else {
          labels[group] = [value.replace(/\-\-/gi, '.')];
        }
      });
    return labels;
  }
}

const actions = {
  setLabels: value => state => {
    const newState = { ...state, labels: ContextActions.setLabels(value), pageNumber: 1 };
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
    const columns = state.columns.slice();
    columns.push(value);
    const newState = {
      ...state,
      columns: columns,
    };
    return newState;
  },
  changeColumn: value => state => {
    const columns = state.columns.slice();
    columns[columns.indexOf(value.oldColumn.simpleName)] = value.column;
    const newState = {
      ...state,
      columns: columns,
      orderBy:
        value.oldColumn.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
    return newState;
  },
  removeColumn: value => state => {
    const columns = state.columns.slice();
    columns.splice(columns.indexOf(value.simpleName), 1);
    const newState = {
      ...state,
      columns: columns,
      orderBy: value.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
    return newState;
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
  updateTimeRange: value => state => {
    const newState = {
      ...state,
      from: value.from,
      to: value.to,
    };
    delete newState.queryId;
    delete newState.querySelected;
    return newState;
  },
  refresh: value => state => {},
};

export const UrlParametersProvider = ({ grafanaProps, children }) => {
  const query = new URLSearchParams(window.location.search);
  const rawTime = { ...grafanaProps.timeRange.raw };
  const from = grafanaProps.timeRange.from.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  const to = grafanaProps.timeRange.to.utc().format('YYYY-MM-DDTHH:mm:ssZ');
  const [panelState, setContext] = useState({
    ...ContextActions.parseURL(query),
  });

  useEffect(() => {
    ContextActions.refreshGrafanaVariables(panelState);
    const newUrl = ContextActions.generateURL(panelState);
    history.pushState({}, 'test', newUrl);
  }, [panelState]);

  const wrapAction = key => value => {
    return setContext(actions[key](value));
  };

  useEffect(() => {
    setContext({ ...panelState, from, to, rawTime });
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

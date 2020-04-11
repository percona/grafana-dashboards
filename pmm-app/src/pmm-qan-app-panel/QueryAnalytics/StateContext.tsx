import React, { useEffect, useReducer, useState } from 'react';
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
    const from = state.rawTime.from ? `from=${state.rawTime.from}` : '';
    const to = state.rawTime.to ? `to=${state.rawTime.to}` : '';
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
    urlParams.columns = JSON.parse(query.get('columns')) || DEFAULT_COLUMNS;
    urlParams.labels = ContextActions.setFilters(query);
    urlParams.pageNumber = 1;
    urlParams.pageSize = 10;
    urlParams.orderBy = query.get('order_by') || `-${urlParams.columns[0]}`;
    urlParams.queryId = query.get('filter_by');
    urlParams.querySelected = !!query.get('filter_by');
    urlParams.groupBy = query.get('group_by') || 'queryid';
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

export const UrlParametersProvider = ({ children }) => {
  const query = new URLSearchParams(window.location.search);
  const [rawTime, setRawTime] = useState({ from: query.get('from'), to: query.get('to') });
  useEffect(() => {
    setRawTime({ from: query.get('from'), to: query.get('to') });
  }, [window.location.search]);

  const [state, dispatch] = useReducer(
    (state, action) => {
      let columns;
      let newState;
      switch (action.type) {
        case 'SET_LABELS':
          newState = { ...state, labels: ContextActions.setLabels(action.payload.labels), pageNumber: 1 };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'RESET_LABELS':
          newState = { ...state, labels: {}, pageNumber: 1 };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'SELECT_QUERY':
          newState = { ...state, queryId: action.payload.queryId || 'TOTAL', querySelected: true };
          break;
        case 'ADD_COLUMN':
          columns = state.columns.slice();
          columns.push(action.payload.column);
          newState = {
            ...state,
            columns: columns,
          };
          break;

        case 'REPLACE_COLUMN':
          columns = state.columns.slice();
          columns[columns.indexOf(action.payload.oldColumn.simpleName)] = action.payload.column;
          newState = {
            ...state,
            columns: columns,
            orderBy:
              action.payload.oldColumn.simpleName === state.orderBy.replace('-', '')
                ? `-${columns[0]}`
                : state.orderBy,
          };
          break;

        case 'REMOVE_COLUMN':
          columns = state.columns.slice();
          columns.splice(columns.indexOf(action.payload.column.simpleName), 1);
          newState = {
            ...state,
            columns: columns,
            orderBy:
              action.payload.column === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
          };
          break;
        case 'CHANGE_PAGE':
          newState = {
            ...state,
            pageNumber: action.payload.pageNumber,
          };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'CHANGE_PAGE_SIZE':
          newState = {
            ...state,
            pageSize: action.payload.pageSize,
            pageNumber: 1,
          };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'CHANGE_SORT':
          let newOrderBy = '';

          if (action.payload.orderBy === state.orderBy) {
            newOrderBy = `-${action.payload.orderBy}`;
          } else if (`-${action.payload.orderBy}` === state.orderBy) {
            newOrderBy = `${action.payload.orderBy}`;
          } else {
            newOrderBy = `-${action.payload.orderBy}`;
          }

          newState = {
            ...state,
            orderBy: newOrderBy,
          };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'CHANGE_GROUP_BY':
          newState = {
            ...state,
            groupBy: action.payload.groupBy,
            querySelected: false,
          };
          delete newState.queryId;
          delete newState.querySelected;
          break;
        case 'SET_FINGERPRINT':
          newState = {
            ...state,
            fingerprint: action.payload.fingerprint,
          };
          break;
        case 'UPDATE_TIME_RANGE':
          newState = {
            ...state,
            from: action.payload.from,
            to: action.payload.to,
          };
          delete newState.queryId;
          delete newState.querySelected;
          break;
      }
      ContextActions.refreshGrafanaVariables(newState);
      newState.rawTime = rawTime;
      const newUrl = ContextActions.generateURL(newState);
      history.pushState({}, 'test', newUrl);
      return newState;
    },
    { ...ContextActions.parseURL(query) }
  );

  useEffect(() => {
    // const state = ContextActions.parseURL(query);
    // dispatch({
    //   type: 'UPDATE_TIME_RANGE',
    //   payload: {
    //     from: state.from,
    //     to: state.to,
    //   },
    // });
  }, [rawTime]);

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

import React, { useReducer, useState } from 'react';
import { ParseQueryParamDate } from '../../react-plugins-deps/components/helpers/time-parameters-parser';

interface ContextInterface {
  filterBy?: any;
  labels?: any;
  selectedVariables?: any;
  columns?: any;
  changeColumn?: any;
  selectQuery?: any;
  removeFilter?: any;
  addFilter?: any;
  resetLabels?: any;
}
const initialState = {} as any;

export const StateContext = React.createContext(initialState);

const DEFAULT_COLUMNS = ['load', 'num_queries', 'query_time'];

class ContextActions {
  selectedVariables?: {};
  columns?: any[];
  filterBy: any;
  labels: any;
  from: any;
  to: any;
  constructor(query) {
    this.parseURL(query);
  }

  static setFilters(query) {
    const filtersListNames = [
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

    return filtersListNames.reduce((result, filterName) => {
      const filters = query.getAll(`var-${filterName}`);
      if (!filters.length) {
        return result;
      }
      result[filterName] = filters;
      return result;
    }, {});
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
    const filterByQuery = state.queryId ? `filter_by=${state.queryId}` : '';
    const orderBy = state.orderBy ? `order_by=${state.orderBy}` : '';
    // page, sort
    // TODO: replace crutch with right redirect
    return `${window.location.pathname}?${[columnsQuery, filterByQuery, labels, orderBy].filter(Boolean).join('&')}`;
  }

  private parseURL(query) {
    this.selectedVariables = ContextActions.setFilters(query);
    this.columns = DEFAULT_COLUMNS;
    this.filterBy = query.get('filter_by');
    this.from = query.get('from') || 'now-12h';
    this.to = query.get('to') || 'now';
  }

  reloadURL() {
    const newUrl = this.generateURL();
    history.pushState({}, 'test', newUrl);
  }

  reloadState() {
    console.log('new state is', this);
  }

  static setLabels(filters) {
    const labels = {};
    Object.keys(filters)
      .filter(filter => filters[filter])
      .forEach(filter => {
        const [group, value] = filter.split(':');
        if (labels[group]) {
          labels[group].push(value);
        } else {
          labels[group] = [value];
        }
      });
    return labels;
  }
}

export const UrlParametersProvider = ({ children }) => {
  const query = new URLSearchParams(window.location.search);
  const context = new ContextActions(query);

  // this.from = ;
  // this.to = query.get('to') || 'now';
  const from = ParseQueryParamDate.transform(query.get('from') || 'now-12h', 'from')
    .utc()
    .format('YYYY-MM-DDTHH:mm:ssZ');
  const to = ParseQueryParamDate.transform(query.get('to') || 'now', 'to')
    .utc()
    .format('YYYY-MM-DDTHH:mm:ssZ');
  console.log(from, to, 'dates ====');
  const [state, dispatch] = useReducer(
    (state, action) => {
      console.log('dispatch-------', action);
      let columns;
      let newState;
      switch (action.type) {
        case 'SET_LABELS':
          newState = { ...state, labels: ContextActions.setLabels(action.payload.labels) };
          break;
        case 'RESET_LABELS':
          newState = { ...state, labels: {} };
          break;
        case 'SELECT_QUERY':
          newState = { ...state, queryId: action.payload.queryId };
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
          };
          break;

        case 'REMOVE_COLUMN':
          columns = state.columns.slice();
          columns.splice(columns.indexOf(action.payload.column), 1);
          newState = {
            ...state,
            columns: columns,
          };
          break;
        case 'CHANGE_PAGE':
          newState = {
            ...state,
            pageNumber: action.payload.pageNumber,
          };
          delete newState.queryId;
          break;
        case 'CHANGE_PAGE_SIZE':
          newState = {
            ...state,
            pageSize: action.payload.pageSize,
            pageNumber: 1,
          };
          delete newState.queryId;
          break;
        case 'CHANGE_SORT':
          newState = {
            ...state,
            orderBy: action.payload.orderBy,
          };
          delete newState.queryId;
          break;
        case 'CHANGE_GROUP_BY':
          newState = {
            ...state,
            groupBy: action.payload.groupBy,
          };
          delete newState.queryId;
          break;
      }
      const newUrl = ContextActions.generateURL(newState);
      console.log('--------', 'Generating new url', newUrl);
      history.pushState({}, 'test', newUrl);
      return newState;
    },
    {
      columns: DEFAULT_COLUMNS,
      labels: ContextActions.setFilters(query),
      pageNumber: 1,
      pageSize: 10,
      orderBy: query.get('order_by'),
      queryId: query.get('filter_by'),
      groupBy: query.get('group_by') || 'queryid',
      from: from,
      to: to,
    }
  );

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

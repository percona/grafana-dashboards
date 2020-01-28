import React, { useReducer, useState } from 'react';

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

  getCurrentState() {
    return {
      selectedVariables: Object.assign({}, this.selectedVariables),
      columns: this.columns,
      filterBy: this.filterBy,
    };
  }
  private setFilters(query) {
    const filtersListNames = ['host', 'city', 'cluster', 'az'];

    return filtersListNames.reduce((result, filterName) => {
      result[filterName] = query.getAll(`var-${filterName}`);
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
    const filterByQuery = state.filterBy ? `filter_by=${state.filterBy}` : '';
    // TODO: replace crutch with right redirect
    return `${window.location.pathname}?${[columnsQuery, filterByQuery, labels].filter(Boolean).join('&')}`;
  }

  private parseURL(query) {
    this.selectedVariables = this.setFilters(query);
    this.columns = DEFAULT_COLUMNS;
    this.filterBy = query.get('filter_by');
    this.from = query.get('from') || 'now-12h';
    this.to = query.get('to') || 'now';
    console.log(this);
  }

  reloadURL() {
    const newUrl = this.generateURL();
    console.log('--------', 'Generating new url');
    history.pushState({}, 'test', newUrl);
  }

  reloadState() {
    console.log('new state is', this);
  }

  setLabels(state, setState, filters) {
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
    this.labels = labels;
  }

  selectQuery(state, setState, queryId) {
    this.filterBy = queryId;
    this.reloadURL();
    this.reloadState();
  }

  changeColumn({ column, oldColumn, action }) {
    switch (action) {
      case 'ADD':
        console.log('ADD', column);
        // @ts-ignore
        this.columns.push(column);
        break;
      case 'REPLACE':
        console.log('REPLACE', column, oldColumn);
        // @ts-ignore
        this.columns[this.columns.indexOf(oldColumn.simpleName)] = column;
        break;
      case 'REMOVE':
        console.log('REMOVE', column);
        // @ts-ignore
        this.columns.splice(this.columns.indexOf(oldColumn.column), 1);
        break;
    }
    this.reloadURL();
    setState({ ...state, columns: this.columns });
    // TODO: there is some index issues, need to check and fix it, in general it works
    this.reloadState();
  }

  changePage() {}

  resetLabels() {
    this.labels = {};
    // this.reloadURL();
    // this.reloadState();
  }

  changeSort() {}
}

export const UrlParametersProvider = ({ children }) => {
  const query = new URLSearchParams(window.location.search);
  console.log('------- rerender provider -----------');
  const context = new ContextActions(query);
  //
  // const [state2, setState] = useState({
  //   setLabels: labels => {
  //     console.log('set labels called', labels);
  //     context.setLabels.bind(context, state, setState)(labels);
  //     context.reloadURL();
  //     context.reloadState();
  //     // setState(state);
  //   },
  //   resetLabels: () => {
  //     context.resetLabels.bind(context, state, setState)();
  //     context.reloadURL();
  //     context.reloadURL();
  //     context.reloadURL();
  //     context.reloadURL();
  //
  //     context.reloadState();
  //     setState({ ...state, labels: {} });
  //   },
  //   selectQuery: queryId => {
  //     context.selectQuery.bind(context, state, setState)(queryId);
  //   },
  //   changeColumn: columnUpdate => {
  //     context.changeColumn.bind(context, state, setState)(columnUpdate);
  //     context.reloadURL();
  //   },
  //   columns: context.columns,
  //   filterBy: context.filterBy,
  //   selectedVariables: context.selectedVariables,
  // } as ContextInterface);

  const [state, dispatch] = useReducer(
    (state, action) => {
      console.log('dispatch-------', action);
      let columns;
      let newState;
      switch (action.type) {
        case 'SET_LABELS':
          newState = { ...state, queryId: action.payload.queryId };
        case 'RESET_LABELS':
          newState = { ...state };
        case 'SELECT_QUERY':
          newState = { ...state, filter_by: action.payload };
        case 'ADD_COLUMN':
          columns = state.columns.slice();
          columns.push(action.payload.column);
          newState = {
            ...state,
            columns: columns,
          };
        case 'REPLACE_COLUMN':
          columns = state.columns.slice();
          columns[columns.indexOf(action.payload.oldColumn.simpleName)] = action.payload.column;
          newState = {
            ...state,
            columns: columns,
          };
        case 'REMOVE_COLUMN':
          columns = state.columns.slice();
          columns.splice(columns.indexOf(action.payload.column), 1);
          newState = {
            ...state,
            columns: columns,
          };
      }
      const newUrl = ContextActions.generateURL(newState);
      console.log('--------', 'Generating new url');
      history.pushState({}, 'test', newUrl);
      return newState;
    },
    { columns: DEFAULT_COLUMNS }
  );

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

import React, { useState } from 'react';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

interface ContextInterface {
  filterBy?: any;
  labels?: any;
  selectedVariables?: any;
  columns?: any;
  changeColumn?: any;
  selectQuery?: any;
  removeFilter?: any;
  addFilter?: any;
}
const initialState = {} as ContextInterface;

export const StateContext = React.createContext(initialState);

const DEFAULT_COLUMNS = ['load', 'num_queries', 'query_time'];

class ContextActions {
  selectedVariables: {};
  columns: any[];
  filterBy: any;
  labels: any;
  constructor(query) {
    this.selectedVariables = this.setFilters(query);
    this.columns = DEFAULT_COLUMNS;
    this.filterBy = query.get('filter_by');
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

  private generateURL() {
    // read parameters and create new url
    const filtersResult = Object.keys(this.selectedVariables)
      .map(key => {
        const variables = this.selectedVariables[key];
        return variables.map(variable => `var-${key}=${variable}`).join('&');
      })
      .filter(Boolean)
      .join('&');
    const filtersQuery = filtersResult || '';
    const columnsQuery = this.columns ? `columns=${JSON.stringify(this.columns)}` : '';
    const filterByQuery = this.filterBy ? `filter_by=${this.filterBy}` : '';
    const labels = `var-testerok=${this.labels}`;
    // TODO: replace crutch with right redirect
    return `${window.location.pathname}?${[filtersQuery, columnsQuery, filterByQuery, labels].filter(Boolean).join('&')}`;
  }

  private reload() {
    const newUrl = this.generateURL();
    console.log(newUrl);
    history.pushState({}, 'test', newUrl);
  }

  setLabels(filters) {
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
    this.reload();
  }

  selectQuery(queryId) {
    this.filterBy = queryId;
    this.reload();
  }

  changeColumn({ column, oldColumn, action }) {
    switch (action) {
      case 'ADD':
        console.log('ADD', column);
        break;
      case 'REPLACE':
        console.log('REPLACE', column, oldColumn);
        break;
      case 'REMOVE':
        console.log('REMOVE', column);
        break;
    }
  }

  changePagination() {}

  addDetailsFilter() {}
  removeDetailsFilter() {}

  changeSort() {}
}

export const UrlParametersProvider = ({ children }) => {
  const query = new URLSearchParams(window.location.search);

  const context = new ContextActions(query);
  // Initial setup
  const [state, setState] = useState({
    setLabels: context.setLabels.bind(context),
    selectQuery: context.selectQuery.bind(context),
    changeColumn: context.changeColumn.bind(context),
    columns: context.columns,
    filterBy: context.filterBy,
    selectedVariables: context.selectedVariables,
  } as ContextInterface);

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
};

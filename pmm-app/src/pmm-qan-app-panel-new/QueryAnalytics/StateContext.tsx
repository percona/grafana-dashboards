import React, { useState } from 'react';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();
interface ContextInterface {
  filterBy?: any;
  labels?: any;
  selectedVariables?: any;
  columns?: any;
  addColumn?: any;
  selectQuery?: any;
  removeFilter?: any;
  addFilter?: any;
}
const initialState = {} as ContextInterface;

export const StateContext = React.createContext(initialState);

const DEFAULT_COLUMNS = ['load', 'num_queries', 'query_time'];
export const UrlParametersProvider = ({ children }) => {
  const query = new URLSearchParams(window.location.search);
  const [hack, setHack] = useState({});
  console.log(hack);
  const reload = () => setHack({});
  const addFilter = filter => changeFilter(filter, true);
  const removeFilter = filter => changeFilter(filter, false);
  const selectQuery = queryId => {};

  const setFilters = query => {
    const filtersListNames = ['host', 'city', 'cluster', 'az'];

    return filtersListNames.reduce((result, filterName) => {
      result[filterName] = query.getAll(`var-${filterName}`);
      return result;
    }, {});
  };

  const updateUrl = () => {
    const filtersResult = Object.keys(state.selectedVariables)
      .map(key => {
        const variables = state.selectedVariables[key];
        return variables.map(variable => `var-${key}=${variable}`).join('&');
      })
      .filter(Boolean)
      .join('&');
    const filtersQuery = filtersResult || '';
    const columnsQuery = state.columns ? `columns=${JSON.stringify(state.columns)}` : '';
    const filterByQuery = state.filterBy ? `filter_by=${state.filterBy}` : '';
    // TODO: replace crutch with right redirect
    window.location.href = `${window.location.pathname}?${[filtersQuery, columnsQuery, filterByQuery].filter(Boolean).join('&')}`;
  };

  const changeFilter = (filter, isAdding) => {
    const [group, value] = filter.split(':');
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    let filtersList = state.selectedVariables[group];
    if (isAdding) {
      filtersList.push(value);
    } else {
      filtersList = filtersList.filter(item => item !== value);
    }
    state.selectedVariables[group] = filtersList.filter(onlyUnique);
    setState({ ...state, selectedVariables: state.selectedVariables });
    updateUrl();
    reload();
  };

  // Initial setup
  const [state, setState] = useState({
    addFilter: addFilter,
    removeFilter: removeFilter,
    selectQuery: selectQuery,
    columns: DEFAULT_COLUMNS,
    filterBy: query.get('filter_by'),
    selectedVariables: setFilters(query),
  } as ContextInterface);

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
};

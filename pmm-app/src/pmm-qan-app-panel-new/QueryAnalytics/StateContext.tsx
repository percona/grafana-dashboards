import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
console.log(history);
console.log(useEffect);
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
  let query = new URLSearchParams(window.location.search);
  const [hack, setHack] = useState({});
  const reload = () => setHack({});
  console.log(hack);
  const setFilters = query => {
    const filtersListNames = ['host', 'city', 'cluster', 'az'];

    return filtersListNames.reduce((result, filterName) => {
      result[filterName] = query.getAll(`var-${filterName}`);
      return result;
    }, {});
  };

  const changeFilter = (filter, isAdding) => {
    console.log(filter, isAdding);
    const [group, value] = filter.split(':');
    let filtersList = state.selectedVariables[group];
    if (isAdding) {
      filtersList.push(value);
    } else {
      filtersList = filtersList.filter(item => item !== value);
    }
    state.selectedVariables[group] = filtersList;
    setState({ ...state, selectedVariables: state.selectedVariables });
    reload();
  };

  const addFilter = filter => changeFilter(filter, true);
  const removeFilter = filter => changeFilter(filter, false);
  const selectQuery = queryId => {};

  // Initial setup
  const [state, setState] = useState({
    // columns: query.get("columns") ? JSON.parse(query.get("columns")) : ["load","num_queries","query_time"],
    columns: DEFAULT_COLUMNS,
    filterBy: query.get('filter_by'),
    selectedVariables: setFilters(query),
    addFilter: addFilter,
    removeFilter: removeFilter,
    selectQuery: selectQuery,
  } as ContextInterface);
  // {
  //   columns: state.columns,
  //       filterBy: state.filterBy,
  //     selectedVariables: state.selectedVariables,
  //     addFilter: addFilter,
  //     removeFilter: removeFilter,
  //     selectQuery: selectQuery
  // }
  //
  // useEffect(() => {
  //   // debugger
  //
  //   // Вот тут setFilters еще просто не отработал поэтому никаких данных нет
  //
  //   const filtersResult = Object.keys(state.selectedVariables)
  //     .map(key => {
  //       const variables = state.selectedVariables[key];
  //       return variables.map(variable => `var-${key}=${variable}`);
  //     })
  //     // .flat()
  //     .join('&');
  //   // debugger;
  //   const filtersQuery = filtersResult || '';
  //   const columnsQuery = state.columns ? `columns=${JSON.stringify(state.columns)}` : '';
  //   const filterByQuery = state.filterBy ? `filter_by=${state.filterBy}` : '';
  //   // history.push({
  //   //   pathname: '/qan',
  //   //   search: `?${[filtersQuery, columnsQuery, filterByQuery].filter(Boolean).join('&')}`,
  //   // });
  //
  //   let location = new URLSearchParams(window.location.search);
  //
  //   const result = {
  //     selectedVariables: setFilters(location),
  //     filterBy: query.get('filter_by'),
  //     columns: DEFAULT_COLUMNS,
  //   };
  //   console.log(result);
  //   // debugger
  //   console.log(state);
  //   setState({ ...state, ...result });
  // }, [hack]);

  //
  // const defaultContext = {
  //   columns: state.columns,
  //   filterBy: state.filterBy,
  //   selectedVariables: state.selectedVariables,
  //   addFilter: addFilter,
  //   removeFilter: removeFilter,
  //   selectQuery: selectQuery
  // };

  console.log(state, '-----------');
  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
};

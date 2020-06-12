import React, { useEffect, useState } from 'react';
import { omit } from 'lodash';
import { QueryAnalyticsContext } from '../panel.types';
import {
  generateURL, parseURL, refreshGrafanaVariables, setLabels
} from './provider.tools';

const initialState = {} as QueryAnalyticsContext;

export const QueryAnalyticsProvider = React.createContext<QueryAnalyticsContext>(initialState);

const actions = {
  // eslint-disable-next-line max-len
  setLabels: (value) => (state) => omit({ ...state, labels: setLabels(value), pageNumber: 1 }, ['queryId', 'querySelected']),
  resetLabels: () => (state) => omit({ ...state, labels: {}, pageNumber: 1 }, ['queryId', 'querySelected']),
  setActiveTab: (value) => (state) => ({ ...state, openDetailsTab: value }),
  selectQuery: (value, totals) => (state) => ({
    ...state,
    queryId: value,
    querySelected: true,
    totals,
  }),
  addColumn: (value) => (state) => {
    const columns = [...state.columns];
    columns.push(value);
    return {
      ...state,
      columns,
    };
  },
  changeColumn: (value) => (state) => {
    const columns = [...state.columns];
    columns[columns.indexOf(value.oldColumn.simpleName)] = value.column;
    return {
      ...state,
      columns,
      orderBy:
        value.oldColumn.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
  },
  swapMainColumn: (value) => (state) => {
    const columns = [...state.columns];
    const columnIndex = columns.indexOf(value.simpleName);
    const currentColumn = columns[columnIndex];
    // eslint-disable-next-line prefer-destructuring
    columns[columnIndex] = columns[0];
    columns[0] = currentColumn;
    return {
      ...state,
      columns,
    };
  },
  removeColumn: (value) => (state) => {
    const columns = [...state.columns];
    columns.splice(columns.indexOf(value.simpleName), 1);
    return {
      ...state,
      columns,
      orderBy: value.simpleName === state.orderBy.replace('-', '') ? `-${columns[0]}` : state.orderBy,
    };
  },
  changePage: (value) => (state) => omit(
    {
      ...state,
      pageNumber: value,
    },
    ['queryId', 'querySelected']
  ),
  changePageSize: (value) => (state) => omit(
    {
      ...state,
      pageSize: value,
      pageNumber: 1,
    },
    ['queryId', 'querySelected']
  ),
  changeSort: (value) => (state) => {
    let newOrderBy = '';

    if (value === state.orderBy) {
      newOrderBy = `-${value}`;
    } else if (`-${value}` === state.orderBy) {
      newOrderBy = `${value}`;
    } else {
      newOrderBy = `-${value}`;
    }

    return omit(
      {
        ...state,
        orderBy: newOrderBy,
        pageNumber: 1,
      },
      ['queryId', 'querySelected']
    );
  },
  changeGroupBy: (value) => (state) => omit(
    {
      ...state,
      groupBy: value,
      querySelected: false,
      pageNumber: 1,
    },
    ['queryId', 'querySelected']
  ),
  closeDetails: () => (state) => omit(
    {
      ...state,
    },
    ['queryId', 'querySelected']
  ),
  setFingerprint: (value) => (state) => ({
    ...state,
    fingerprint: value,
  }),
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
    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, 'test', newUrl);
  }, [panelState]);

  const wrapAction = (key) => (...value) => setContext(actions[key](...value));

  const [isFirstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    const newState = {
      ...panelState,
      from,
      to,
      rawTime,
    };

    if (panelState.rawTime.from !== rawTime.from || panelState.rawTime.to !== rawTime.to) {
      newState.pageNumber = 1;
      delete newState.queryId;
      delete newState.querySelected;
    }

    setContext(newState);
  }, [rawTime.from, rawTime.to]);

  // refresh
  useEffect(() => {
    // TODO: can't remove it because now grafana updates time variables even when it wasn't changed
    const refreshButton = document.querySelector('.refresh-picker-buttons button');
    const refreshHandle = () => {
      const newState = {
        ...panelState,
        from,
        to,
        rawTime,
      };
      if (panelState.rawTime.from !== rawTime.from || panelState.rawTime.to !== rawTime.to) {
        newState.pageNumber = 1;
        delete newState.queryId;
        delete newState.querySelected;
      }

      setContext(newState);
    };
    if (refreshButton) {
      refreshButton.addEventListener('click', refreshHandle);
    }

    return () => {
      if (refreshButton) {
        refreshButton.removeEventListener('click', refreshHandle);
      }
    };
  }, []);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <QueryAnalyticsProvider.Provider
      value={{
        panelState,
        contextActions: Object.keys(actions).reduce((actionsList, key) => {
          // eslint-disable-next-line no-param-reassign
          actionsList[key] = wrapAction(key);
          return actionsList;
        }, {}),
      }}
    >
      {children}
    </QueryAnalyticsProvider.Provider>
  );
};

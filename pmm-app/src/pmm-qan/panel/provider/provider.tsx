import React, { useEffect, useState } from 'react';
import { omit } from 'lodash';
import {
  parseURL, refreshGrafanaVariables, setLabels
} from './provider.tools';
import { QueryAnalyticsContext } from './provider.types';

const initialState = {} as QueryAnalyticsContext;

export const QueryAnalyticsProvider = React.createContext<QueryAnalyticsContext>(initialState);

const actions = {
  // eslint-disable-next-line max-len
  setLabels: (value) => (state) => omit({ ...state, labels: setLabels(value), pageNumber: 1 }, ['queryId', 'querySelected']),
  resetLabels: () => (state) => omit({ ...state, labels: {}, pageNumber: 1 }, ['queryId', 'querySelected']),
  setActiveTab: (value) => (state) => ({ ...state, openDetailsTab: value }),
  setLoadingDetails: (value) => (state) => ({ ...state, loadingDetails: value }),
  selectQuery: (value, totals) => (state) => ({
    ...state,
    queryId: value,
    querySelected: true,
    // openDetailsTab: 'details',
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
  changeSort: (value) => (state) => omit(
    {
      ...state,
      orderBy: value,
      pageNumber: 1,
    },
    ['queryId', 'querySelected']
  ),
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
      loadingDetails: false,
    },
    ['queryId', 'querySelected']
  ),
  setFingerprint: (value) => (state) => ({
    ...state,
    fingerprint: value,
  }),
};

export const UrlParametersProvider = ({ timeRange, children }) => {
  const query = new URLSearchParams(window.location.search);

  const [panelState, setContext] = useState({
    ...parseURL(query),
    rawTime: {
      from: timeRange.raw.from,
      to: timeRange.raw.to,
    },
  });

  useEffect(() => {
    setContext({
      ...panelState,
      rawTime: {
        from: timeRange.raw.from,
        to: timeRange.raw.to,
      },
    });
  }, [timeRange.raw.from, timeRange.raw.to]);

  useEffect(() => {
    refreshGrafanaVariables(panelState);
  }, [panelState]);

  const [from, setFrom] = useState(timeRange.raw.from);
  const [to, setTo] = useState(timeRange.raw.to);

  useEffect(() => {
    if (from === timeRange.raw.from && to === timeRange.raw.to) {
      const newState = {
        ...panelState,
        from: timeRange.from.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        to: timeRange.to.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        rawTime: {
          from: timeRange.raw.from,
          to: timeRange.raw.to,
        },
      };

      setContext(newState);
    } else {
      const newState = {
        ...panelState,
        from: timeRange.from.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        to: timeRange.to.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
        rawTime: {
          from: timeRange.raw.from,
          to: timeRange.raw.to,
        },
      };

      newState.pageNumber = 1;
      delete newState.queryId;
      delete newState.querySelected;
      setContext(newState);
    }

    setFrom(timeRange.raw.from);
    setTo(timeRange.raw.to);
  }, [timeRange, from, to]);

  const wrapAction = (key) => (...value) => setContext(actions[key](...value));

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

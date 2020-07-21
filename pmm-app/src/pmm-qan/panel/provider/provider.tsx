import React, { useCallback, useEffect, useState } from 'react';
import { omit } from 'lodash';
import { getDataSourceSrv } from '@grafana/runtime';
import {
  generateURL, parseURL, refreshGrafanaVariables, setLabels
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
      loadingDetails: false
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
  const rawTime = { ...timeRange.raw };
  const [panelState, setContext] = useState({
    ...parseURL(query),
    rawTime,
  });


  const onRefresh = useCallback((event) => {
    const newState = {
      ...panelState,
      from: event.from.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      to: event.to.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      rawTime: {
        from: event.raw.from,
        to: event.raw.to,
      },
    };

    setContext(newState);
  }, [panelState]);

  const onTimeRangeChange = useCallback((event) => {
    const newState = {
      ...panelState,
      from: event.from.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      to: event.to.utc().format('YYYY-MM-DDTHH:mm:ssZ'),
      rawTime: {
        from: event.raw.from,
        to: event.raw.to,
      },
    };

    newState.pageNumber = 1;
    delete newState.queryId;
    delete newState.querySelected;
    setContext(newState);
  }, [panelState]);

  const dataSource = getDataSourceSrv();

  const templateVariables = (dataSource as any).templateSrv.variables;
  const { variableSrv } = templateVariables[0];
  // eslint-disable-next-line no-underscore-dangle

  const [from, setFrom] = useState(rawTime.from);
  const [to, setTo] = useState(rawTime.to);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const handler = variableSrv.dashboard.events.emitter._events['time-range-updated'][0];

    const updateHandler = (event) => {
      if (from !== event.raw.from || to !== event.raw.to) {
        onTimeRangeChange(event);
      } else {
        onRefresh(event);
      }

      setFrom(event.raw.from);
      setTo(event.raw.to);
      // from = event.raw.from;
      // to = event.raw.to;
    };

    handler.fn = updateHandler;

    // eslint-disable-next-line  no-underscore-dangle
    variableSrv.dashboard.events.emitter._events['time-range-updated'] = [handler];
  }, [panelState, from, to]);

  useEffect(() => {
    refreshGrafanaVariables(panelState);
    const newUrl = generateURL(panelState);

    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, 'test', newUrl);
  }, [panelState]);

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

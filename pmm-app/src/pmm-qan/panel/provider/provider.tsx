import React, { useEffect, useState, useRef } from 'react';
import { omit, isEqual } from 'lodash';
import { parseURL, refreshGrafanaVariables, setLabels } from './provider.tools';
import { QueryAnalyticsContext } from './provider.types';
import { ParseQueryParamDate } from '../../../shared/components/helpers/time-parameters-parser';

const initialState = {} as QueryAnalyticsContext;

export const QueryAnalyticsProvider = React.createContext<QueryAnalyticsContext>(initialState);

export const UrlParametersProvider = ({ timeRange, children }) => {
  const actions = {
    // eslint-disable-next-line max-len
    setLabels: (value) => (state) => omit({ ...state, labels: setLabels(value), pageNumber: 1 }, ['queryId', 'querySelected']),
    resetLabels: () => (state) => omit({ ...state, labels: {}, pageNumber: 1 }, ['queryId', 'querySelected']),
    selectTime: (value) => (state) => ({
      ...state,
      from: value[0],
      to: value[1],
      rawTime: {
        from: value[0],
        to: value[1],
      },
    }),
    setActiveTab: (value) => (state) => ({ ...state, openDetailsTab: value }),
    highlightSparkline: (value) => (state) => ({ ...state, highlightedCoords: value }),
    setLoadingDetails: (value) => (state) => ({ ...state, loadingDetails: value }),
    selectQuery: (value, totals) => (state) => ({
      ...state,
      queryId: value.queryId,
      querySelected: true,
      database: value.database,
      // openDetailsTab: 'details',
      totals,
    }),
    addColumn: (value) => (state) => {
      // @ts-ignore
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
      ['queryId', 'querySelected'],
    ),
    changePageSize: (value) => (state) => omit(
      {
        ...state,
        pageSize: value,
        pageNumber: 1,
      },
      ['queryId', 'querySelected'],
    ),
    changeSort: (value) => (state) => omit(
      {
        ...state,
        orderBy: value,
        pageNumber: 1,
      },
      ['queryId', 'querySelected'],
    ),
    changeGroupBy: (value) => (state) => omit(
      {
        ...state,
        groupBy: value,
        querySelected: false,
        pageNumber: 1,
      },
      ['queryId', 'querySelected'],
    ),
    closeDetails: () => (state) => omit(
      {
        ...state,
        loadingDetails: false,
      },
      ['queryId', 'querySelected'],
    ),
    setFingerprint: (value) => (state) => ({
      ...state,
      fingerprint: value,
    }),
    setSearch: ({ search }) => (state) => ({
      ...state,
      search,
    }),
    setDimensionSearchText: ({ search }) => (state) => ({
      ...state,
      dimensionSearchText: search,
    }),
  };

  const query = new URLSearchParams(window.location.search);
  const searchRef = useRef<string| null>(null);
  const [fromTimeMomentValue, setFromTimeMomentValue] = useState(ParseQueryParamDate.transform(
    query.get('from') || 'now-12h', 'from',
  ).utc().format('YYYY-MM-DDTHH:mm:ssZ'));
  const [toTimeMomentValue, setToTimeMomentValue] = useState(ParseQueryParamDate.transform(
    query.get('to') || 'now', 'to',
  ).utc().format('YYYY-MM-DDTHH:mm:ssZ'));

  const [panelState, setContext] = useState({
    ...parseURL(query),
    rawTime: {
      from: timeRange.raw.from,
      to: timeRange.raw.to,
    },
    from: fromTimeMomentValue,
    to: toTimeMomentValue,
    search: searchRef.current,
  });

  if (searchRef.current !== query.get('search')) {
    searchRef.current = query.get('search');
    setContext({
      ...panelState,
      search: searchRef.current,
    });
  }

  useEffect(() => {
    setContext({
      ...panelState,
      rawTime: {
        from: timeRange.raw.from,
        to: timeRange.raw.to,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange.raw.from, timeRange.raw.to]);

  useEffect(() => {
    refreshGrafanaVariables(panelState);
  }, [panelState]);

  const getAbsoluteTime = (timeValue) => (timeValue.valueOf ? timeValue.valueOf() : timeValue);
  const [from, setFrom] = useState(getAbsoluteTime(timeRange.raw.from));
  const [to, setTo] = useState(getAbsoluteTime(timeRange.raw.to));
  const [previousState, setPreviousState] = useState(panelState);

  useEffect(() => {
    const newTo = getAbsoluteTime(timeRange.raw.to);

    if (newTo === 'now') {
      setToTimeMomentValue(timeRange.to.utc().subtract(1, 'minute').format('YYYY-MM-DDTHH:mm:ssZ'));
      setFromTimeMomentValue(timeRange.from.utc().subtract(1, 'minute').format('YYYY-MM-DDTHH:mm:ssZ'));
    } else {
      setToTimeMomentValue(timeRange.to.utc().format('YYYY-MM-DDTHH:mm:ssZ'));
      setFromTimeMomentValue(timeRange.from.utc().format('YYYY-MM-DDTHH:mm:ssZ'));
    }
  }, [timeRange, from, to]);

  useEffect(() => {
    const newFrom = getAbsoluteTime(timeRange.raw.from);
    const newTo = getAbsoluteTime(timeRange.raw.to);

    const newState = {
      ...panelState,
      from: fromTimeMomentValue,
      to: toTimeMomentValue,
      rawTime: {
        from: newFrom,
        to: newTo,
      },
      search: searchRef.current,
    };

    if (from === newFrom && to === newTo) {
      const oldState = omit(previousState, ['from', 'to', 'rawTime']);
      const updatedState = omit(panelState, ['from', 'to', 'rawTime']);

      if (isEqual(oldState, updatedState)) {
        setContext(newState);
      }
    } else {
      newState.pageNumber = 1;
      delete newState.queryId;
      // @ts-ignore
      delete newState.querySelected;
      setContext(newState);
    }

    setPreviousState(newState);
    setFrom(newFrom);
    setTo(newTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromTimeMomentValue, toTimeMomentValue]);

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

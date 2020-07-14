import React, { FC, useState } from 'react';
import { Details } from './Details.types';

const initialState = {
  detailsState: {
    tables: [],
    classicExplain: {
      error: '',
      loading: true,
      value: null,
    },
    jsonExplain: {
      error: '',
      loading: true,
      value: null,
    },
  },
} as Details;

export const DetailsProvider = React.createContext(initialState);

const actions = {
  setFoundData: (value) => (state) => {
    const newState = {
      ...state,
      ...value,
    };

    return newState;
  },
  resetDetailsToDefault: () => (state) => ({ ...initialState.detailsState, databaseType: state.databaseType })
};

export const DetailsContentProvider: FC = ({ children }) => {
  const [detailsState, setContext] = useState({ tables: [] });
  const wrapAction = (key) => (value) => setContext(actions[key](value));

  return (
    <DetailsProvider.Provider
      value={{
        detailsState,
        contextActions: Object.keys(actions).reduce((actions, key) => {
          // eslint-disable-next-line no-param-reassign
          actions[key] = wrapAction(key);

          return actions;
        }, {}),
      }}
    >
      {children}
    </DetailsProvider.Provider>
  );
};

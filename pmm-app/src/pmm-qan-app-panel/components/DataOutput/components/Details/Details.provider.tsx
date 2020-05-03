import React, { useState } from 'react';

interface DetailsState {
  examples?: any;
  jsonExplain?: any;
  classicExplain?: any;
  tables?: any;
  databaseType?: 'mysql' | 'postgresql' | 'mongodb';
}

interface Details {
  contextActions: any;
  detailsState: DetailsState;
}
const initialState = { detailsState: { tables: [] } } as Details;

export const DetailsProvider = React.createContext(initialState);

const actions = {
  setExamples: value => state => {
    const newState = {
      ...state,
      examples: value,
    };
    return newState;
  },
  setDatabaseType: value => state => {
    const newState = {
      ...state,
      databaseType: value,
    };
    return newState;
  },
  setTables: value => state => {
    const newState = {
      ...state,
      tables: value,
    };
    return newState;
  },
  setExplainJSON: value => state => {
    const newState = {
      ...state,
      jsonExplain: value,
    };
    return newState;
  },
  setExplainClassic: value => state => {
    const newState = {
      ...state,
      classicExplain: value,
    };
    return newState;
  },
};

export const DetailsContentProvider = ({ children }) => {
  const [detailsState, setContext] = useState({ tables: [] });
  const wrapAction = key => value => {
    return setContext(actions[key](value));
  };

  return (
    <DetailsProvider.Provider
      value={{
        detailsState: detailsState,
        contextActions: Object.keys(actions).reduce((actions, key) => {
          actions[key] = wrapAction(key);
          return actions;
        }, {}),
      }}
    >
      {children}
    </DetailsProvider.Provider>
  );
};

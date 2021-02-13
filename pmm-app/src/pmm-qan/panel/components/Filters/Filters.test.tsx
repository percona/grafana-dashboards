import React from 'react';
import { mount } from 'enzyme';
import { Filters } from './Filters';

jest.mock('shared/components/helpers/notification-manager');
const originalConsoleError = console.error;

const panelState = {
  labels: {
    database: ['postgres', 'pmm-managed'],
  },
  from: '2020-11-27T22:57:51+00:00',
  to: '2020-11-28T01:57:51+00:00',
  columns: ['load', 'num_queries', 'query_time'],
  rawTime: {
    from: '2020-11-27T22:57:51+00:00',
    to: '2020-11-28T01:57:51+00:00',
  },
  loadingDetails: false,
};

jest.spyOn(React, 'useContext').mockImplementation(() => ({
  panelState,
  contextActions: { test: 'test' },
}));

jest.mock('./hooks/useFilters');

jest.mock('shared/components/helpers/getPmmTheme', () => ({
  getPmmTheme: jest.fn(() => ({
    mainTextColor: 'black',
    table: {
      backgroundColor: 'black',
      borderColor: 'black',
      headerBackground: 'black',
      textColor: 'black',
    },
  })),
}));

jest.mock('./components/CheckboxGroup/CheckboxGroup', () => ({
  CheckboxGroup: ({ children }) => <div>{children}</div>,
}));

// TODO: enable after antd will be removed
xdescribe('useFilters::', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should render filters correct', async () => {
    mount(<Filters />);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Databases } from 'shared/core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { TopQuery } from './TopQuery';

jest.mock('shared/components/helpers/notification-manager');

describe('TopQuery::', () => {
  it('should render query and tooltip icon', () => {
    const { container, getByText } = render(
      <TopQuery
        databaseType={Databases.postgresql}
        query="test"
        queryId="testId"
      />,
    );

    expect(getByText('test')).not.toBeNull();
    expect(container.querySelectorAll('svg').length).toBe(1);
  });

  it('should select query on click', () => {
    const selectQuery = jest.fn();
    const setDimensionSearchText = jest.fn();
    const { getByText } = render(
      <QueryAnalyticsProvider.Provider
        value={{
          panelState: {} as any,
          contextActions: {
            selectQuery,
            setDimensionSearchText,
          },
        }}
      >
        <TopQuery
          databaseType={Databases.postgresql}
          query="test"
          queryId="testId"
        />
      </QueryAnalyticsProvider.Provider>,
    );

    fireEvent.click(getByText('test'));

    expect(selectQuery).toHaveBeenCalledTimes(1);
    expect(setDimensionSearchText).toHaveBeenCalledTimes(1);
  });
});

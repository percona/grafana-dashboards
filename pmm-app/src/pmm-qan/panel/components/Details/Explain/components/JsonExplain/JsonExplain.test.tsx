import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { JsonExplain } from './JsonExplain';
import { useExplains } from '../../Explain.hooks';

import Mock = jest.Mock;

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');

describe('JsonExplain::', () => {
  it('should render explains correct for loading state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      {
        error: '',
        loading: true,
        value: null,
      },
    ]);
    const root = mount(<JsonExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      {
        error: 'some error',
        loading: false,
        value: null,
      },
    ]);
    const root = mount(<JsonExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      {
        error: '',
        loading: false,
        value: JSON.stringify({ data: 'test' }),
      },
    ]);
    const root = mount(<JsonExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(0);
  });
});

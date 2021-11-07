import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { ClassicExplain } from './ClassicExplain';
import { useExplains } from '../../Explain.hooks';

import Mock = jest.Mock;

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');

const explains = [
  {
    error: '',
    loading: true,
    value: null,
  },
  {
    error: 'some error',
    loading: false,
    value: null,
  },
  {
    error: '',
    loading: false,
    value: JSON.stringify({ data: 'test' }),
  },
];

describe('ClassicExplain::', () => {
  it('should render explains correct for loading state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [undefined, explains[0]]);
    const root = mount(<ClassicExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [undefined, explains[1]]);
    const root = mount(<ClassicExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [undefined, explains[2]]);
    const root = mount(<ClassicExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(1);
  });
});

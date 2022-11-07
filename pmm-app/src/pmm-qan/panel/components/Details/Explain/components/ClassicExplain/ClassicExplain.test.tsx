import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { ClassicExplain } from './ClassicExplain';

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
    const root = mount(<ClassicExplain classicExplain={explains[0]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    const root = mount(<ClassicExplain classicExplain={explains[1]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    const root = mount(<ClassicExplain classicExplain={explains[2]} />);

    expect(root.find(dataTestId('classic-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('classic-explain-no-data')).length).toBe(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { ClassicExplain } from './ClassicExplain';
import { useExplains } from '../../Explain.hooks';
import { dataQa } from '@percona/platform-core';

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');
jest.mock('antd/es/tooltip', () => <div className="tooltip" />);

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
  it('should render explains correct for loading state', function() {
    useExplains.mockImplementationOnce(() => {
      return [, explains[0]];
    });
    const root = mount(<ClassicExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('classic-explain-error')).length).toBe(0);
    expect(root.find(dataQa('classic-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', function() {
    useExplains.mockImplementationOnce(() => {
      return [, explains[1]];
    });
    const root = mount(<ClassicExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('classic-explain-error')).length).toBe(1);
    expect(root.find(dataQa('classic-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', function() {
    useExplains.mockImplementationOnce(() => {
      return [, explains[2]];
    });
    const root = mount(<ClassicExplain databaseType={'mysql'} examples={[]} />);

    expect(root.find(dataQa('classic-explain-error')).length).toBe(0);
    expect(root.find(dataQa('classic-explain-no-data')).length).toBe(1);
  });
});

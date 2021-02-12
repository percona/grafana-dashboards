import React from 'react';
import { mount } from 'enzyme';
import { dataQa } from '@percona/platform-core';
import { VisualExplain } from './VisualExplain';
import { useExplains } from '../../Explain.hooks';

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');
jest.mock('antd/es/tooltip', () => <div className="tooltip" />);

describe('VisualExplain::', () => {
  it('should render explains correct for loading state', () => {
    useExplains.mockImplementationOnce(() => [, ,

      {
        error: '',
        loading: true,
        value: null,
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataQa('visual-explain-error')).length).toBe(0);
    expect(root.find(dataQa('visual-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    useExplains.mockImplementationOnce(() => [, ,

      {
        error: 'some error',
        loading: false,
        value: null,
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataQa('visual-explain-error')).length).toBe(1);
    expect(root.find(dataQa('visual-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    useExplains.mockImplementationOnce(() => [, ,

      {
        error: '',
        loading: false,
        value: 'data',
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataQa('visual-explain-error')).length).toBe(0);
    expect(root.find(dataQa('visual-explain-no-data')).length).toBe(0);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { VisualExplain } from './VisualExplain';

jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');

describe('VisualExplain::', () => {
  it('should render explains correct for loading state', () => {
    const visualExplain = {
      error: '',
      loading: true,
      value: null,
    };
    const root = mount(<VisualExplain visualExplain={visualExplain} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    const visualExplain = {
      error: 'some error',
      loading: false,
      value: null,
    };
    const root = mount(<VisualExplain visualExplain={visualExplain} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    const visualExplain = {
      error: '',
      loading: false,
      value: 'data',
    };
    const root = mount(<VisualExplain visualExplain={visualExplain} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(0);
  });
});

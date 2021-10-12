import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from '@percona/platform-core';
import { VisualExplain } from './VisualExplain';
import { useExplains } from '../../Explain.hooks';

import Mock = jest.Mock;

jest.mock('../../Explain.hooks');
jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');

describe('VisualExplain::', () => {
  it('should render explains correct for loading state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      undefined,
      undefined,
      {
        error: '',
        loading: true,
        value: null,
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      undefined,
      undefined,

      {
        error: 'some error',
        loading: false,
        value: null,
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    (useExplains as Mock).mockImplementationOnce(() => [
      undefined,
      undefined,

      {
        error: '',
        loading: false,
        value: 'data',
      },
    ]);
    const root = mount(<VisualExplain databaseType="mysql" examples={[]} />);

    expect(root.find(dataTestId('visual-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('visual-explain-no-data')).length).toBe(0);
  });
});

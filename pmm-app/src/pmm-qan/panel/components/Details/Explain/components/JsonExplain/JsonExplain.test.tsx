import React from 'react';
import { mount } from 'enzyme';
import { dataTestId } from 'shared/core/test.utils';
import { JsonExplain } from './JsonExplain';

jest.mock('shared/components/Elements/Scrollbar/Scrollbar');
jest.mock('shared/components/helpers/notification-manager');

describe('JsonExplain::', () => {
  it('should render explains correct for loading state', () => {
    const jsonExplain = {
      error: '',
      loading: true,
      value: null,
    };
    const root = mount(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    const jsonExplain = {
      error: 'some error',
      loading: false,
      value: null,
    };
    const root = mount(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(1);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    const jsonExplain = {
      error: '',
      loading: false,
      value: JSON.stringify({ data: 'test' }),
    };
    const root = mount(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.find(dataTestId('json-explain-error')).length).toBe(0);
    expect(root.find(dataTestId('json-explain-no-data')).length).toBe(0);
  });
});

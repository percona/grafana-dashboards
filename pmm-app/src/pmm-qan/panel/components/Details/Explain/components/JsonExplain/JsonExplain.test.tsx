import React from 'react';
import { render } from '@testing-library/react';

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
    const root = render(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.queryAllByTestId('json-explain-error').length).toBe(0);
    expect(root.queryAllByTestId('json-explain-no-data').length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    const jsonExplain = {
      error: 'some error',
      loading: false,
      value: null,
    };
    const root = render(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.queryAllByTestId('json-explain-error').length).toBe(1);
    expect(root.queryAllByTestId('json-explain-no-data').length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    const jsonExplain = {
      error: '',
      loading: false,
      value: JSON.stringify({ data: 'test' }),
    };
    const root = render(<JsonExplain jsonExplain={jsonExplain} />);

    expect(root.queryAllByTestId('json-explain-error').length).toBe(0);
    expect(root.queryAllByTestId('json-explain-no-data').length).toBe(0);
  });
});

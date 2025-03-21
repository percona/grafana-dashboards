import React from 'react';

import { render } from '@testing-library/react';

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
    const root = render(<ClassicExplain classicExplain={explains[0]} />);

    expect(root.queryAllByTestId('classic-explain-error').length).toBe(0);
    expect(root.queryAllByTestId('classic-explain-no-data').length).toBe(1);
  });

  it('should render explains correct for error state', () => {
    const root = render(<ClassicExplain classicExplain={explains[1]} />);

    expect(root.queryAllByTestId('classic-explain-error').length).toBe(1);
    expect(root.queryAllByTestId('classic-explain-no-data').length).toBe(0);
  });

  it('should render explains correct for success state', () => {
    const root = render(<ClassicExplain classicExplain={explains[2]} />);

    expect(root.queryAllByTestId('classic-explain-error').length).toBe(0);
    expect(root.queryAllByTestId('classic-explain-no-data').length).toBe(1);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { Plan } from './Plan';

describe('Plan::', () => {
  it('renders plan query and tooltip', () => {
    const { container, getByText } = render(<Plan planQuery="test" planId="testId" />);

    expect(getByText('test')).not.toBeNull();
    expect(container.querySelectorAll('svg').length).toBe(1);
  });
});

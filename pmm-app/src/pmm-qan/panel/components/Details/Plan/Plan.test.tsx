import React from 'react';
import { render } from '@testing-library/react';
import { Plan } from './Plan';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./Plan.hooks');

describe('Plan::', () => {
  it('renders plan query and tooltip', () => {
    const { container } = render(<Plan />);

    expect(container.querySelectorAll('code').length).toBe(1);
    expect(container.querySelectorAll('svg').length).toBe(1);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { Plan } from './Plan';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('./Plan.hooks');

describe('Plan::', () => {
  beforeEach(() => {
    console.error = jest.fn();
    // TODO: Grafana Tooltip component uses a react 18 hook - useId
    // due to enzyme we are currently stuck at react 17, mocking for now
    // @ts-ignore
    React.useId = () => '';
  });

  it('renders plan query and tooltip', () => {
    const { container } = render(<Plan />);

    expect(container.querySelectorAll('code').length).toBe(1);
    expect(container.querySelectorAll('svg').length).toBe(1);
  });
});

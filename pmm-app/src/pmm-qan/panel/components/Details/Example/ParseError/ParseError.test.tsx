import React from 'react';
import { render } from '@testing-library/react';
import ParseError from './ParseError';
import { Messages } from './ParseError.messages';

describe('Parse Error Message', () => {
  it('renders with correct message', () => {
    const { container } = render(<ParseError />);

    expect(container.textContent).toBe(Messages.parsingFailed);
  });
});

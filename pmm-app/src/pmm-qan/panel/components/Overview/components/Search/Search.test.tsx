import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Search } from './Search';

describe('Search::', () => {
  it('renders correctly', () => {
    const { container } = render(<Search handleSearch={() => {}} />);
    const form = container.querySelector('form');

    expect(form?.children.length).toBe(2);
  });
  it('renders correctly with initial value', () => {
    const { container } = render(<Search handleSearch={() => {}} initialValue="Test value" />);

    expect(container.querySelector('input')?.value).toEqual('Test value');
  });
  it('submits correctly', () => {
    const handleSearch = jest.fn();
    const { container } = render(<Search handleSearch={handleSearch} />);

    const form = container.querySelector('form');

    if (form) {
      fireEvent.submit(form);
    }

    expect(handleSearch).toHaveBeenCalled();
  });
});

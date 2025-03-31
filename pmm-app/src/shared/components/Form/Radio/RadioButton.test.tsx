import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RadioButton } from './RadioButton';

const testProps = {
  id: 'test-id',
  name: 'test-name',
  active: false,
  onChange: jest.fn(),
};

describe('RadioButton::', () => {
  it('Renders correctly', () => {
    const { container } = render(<RadioButton {...testProps}>Test</RadioButton>);
    const input = container.querySelector('input');
    const label = container.querySelector('label');

    expect(label?.textContent).toEqual('Test');
    expect(input?.id).toEqual(testProps.id);
    expect(input?.name).toEqual(testProps.name);
  });

  it('Renders with active class', () => {
    const { container } = render(<RadioButton {...testProps} active>Test</RadioButton>);

    expect(container.querySelector('label')?.className).toContain('active');
  });

  it('Renders with disabled class', () => {
    const { container } = render(<RadioButton {...testProps} disabled>Test</RadioButton>);

    expect(container.querySelector('label')?.className).toContain('disabled');
  });

  it('Calls onChange when clicked', () => {
    const { container } = render(<RadioButton {...testProps}>Test</RadioButton>);

    const label = container.querySelector('label');

    if (label) {
      fireEvent.click(label);
    }

    expect(testProps.onChange).toHaveBeenCalled();
  });
});

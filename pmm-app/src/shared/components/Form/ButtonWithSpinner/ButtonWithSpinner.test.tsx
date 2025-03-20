import React from 'react';
import { render } from "@testing-library/react";
import { ButtonWithSpinner } from './ButtonWithSpinner';

describe('CheckPanel::', () => {
  it('should hide the spinner by default', () => {
    const root = render(<ButtonWithSpinner>Test text</ButtonWithSpinner>);

    expect(
      root.queryByRole('button')?.querySelectorAll('svg')?.length).toEqual(0);
    expect(
      root.queryByRole('button')?.textContent).toEqual('Test text');
  });

  it('should show children if not loading', () => {
    const root = render(<ButtonWithSpinner isLoading>Test text</ButtonWithSpinner>);
    expect(
      root.queryByRole('button')?.querySelectorAll('svg')?.length).toEqual(1);
    expect(
      root.queryByRole('button')?.textContent).not.toEqual('Test text');
  });
});

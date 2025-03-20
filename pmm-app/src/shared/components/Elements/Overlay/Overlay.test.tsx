import React from 'react';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";
import { Overlay } from './Overlay';

describe('Overlay::', () => {
  it('Renders children correctly', () => {
    const root = render(
      <Overlay isPending={false}>
        <p>Child 1</p>
        <p>Child 2</p>
      </Overlay>,
    );
    const wrapper = root.getByTestId('pmm-overlay-wrapper');

    expect(wrapper.children.length).toEqual(2);
  });

  it('Renders overlay and spinner while pending', () => {
    const root = render(
      <Overlay isPending>
        <p>Test</p>
      </Overlay>,
    );
    const wrapper = root.getByTestId('pmm-overlay-wrapper');

    expect(wrapper.children.length).toBe(2);
    expect(wrapper.children[0].getElementsByTagName('i')).toBeTruthy();
  });

  it('Doesnt render overlay if not pending', () => {
    const {container} = render(
      <Overlay isPending={false}>
        <p>Test</p>
      </Overlay>,
    );

    expect(container?.querySelector('i')).toBeNull();
  });
});

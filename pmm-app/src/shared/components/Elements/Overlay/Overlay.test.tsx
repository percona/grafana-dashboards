import React from 'react';
import { mount } from 'enzyme';
import { Overlay } from './Overlay';


describe('Overlay::', () => {
  it('Renders children correctly', () => {
    const root = mount(
      <Overlay isPending={false}>
        <p>Child 1</p>
        <p>Child 2</p>
      </Overlay>
    );

    expect(root.find('div').children().length).toEqual(2);
  });

  it('Renders overlay and spinner while pending', () => {
    const root = mount(
      <Overlay
        isPending
        dataQa="data-qa-overlay"
      >
        <p>Test</p>
      </Overlay>
    );
    const overlay = root.find('data-qa-overlay');

    expect(overlay).toBeTruthy();
    expect(overlay.find('i')).toBeTruthy();
  });

  it('Doesnt render overlay if not pending', () => {
    const root = mount(
      <Overlay
        isPending={false}
        dataQa="data-qa-overlay"
      >
        <p>Test</p>
      </Overlay>
    );

    expect(root.find('data-qa-overlay').exists()).toBeFalsy();
  });
});

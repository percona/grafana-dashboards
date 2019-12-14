// Just a stub test
import { ToggleField } from './Toggle';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Toggle field test', () => {
  it('Toggle renders correct without props', () => {
    const component = renderer.create(<ToggleField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

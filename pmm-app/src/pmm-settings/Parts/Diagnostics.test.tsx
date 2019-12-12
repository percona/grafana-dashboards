// Just a stub test
import Diagnostics from './Diagnostics';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    const component = renderer.create(<Diagnostics />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

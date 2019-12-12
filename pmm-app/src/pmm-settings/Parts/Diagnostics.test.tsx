// Just a stub test
import Diagnostics from './Diagnostics';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Diagnostics part test', () => {
  it('Renders correct', () => {
    const component = renderer.create(<Diagnostics />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Just a stub test
import { Latency } from './Latency';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Latency chart test', () => {
  it('Renders correct with empty props', () => {
    const component = renderer.create(<Latency data={{}} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

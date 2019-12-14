// Just a stub test
import { StepsField } from './Steps';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Steps field test', () => {
  xit('Steps renders correct without props', () => {
    const component = renderer.create(<StepsField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

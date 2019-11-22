// Just a stub test
import { InputField } from './Input';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Input field test', () => {
  it('Input renders correct without props', () => {
    const component = renderer.create(<InputField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Just a stub test
import { CheckboxField } from './Checkbox';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    const component = renderer.create(<CheckboxField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

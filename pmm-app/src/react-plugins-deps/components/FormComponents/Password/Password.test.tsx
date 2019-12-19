// Just a stub test
import { PasswordField } from './Password';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Password field test', () => {
  it('Password renders correct without props', () => {
    const component = renderer.create(<PasswordField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Just a stub test
import { TextAreaField } from './TextArea';
import React from 'react';
import renderer from 'react-test-renderer';

describe('TextArea field test', () => {
  it('TextArea renders correct without props', () => {
    const component = renderer.create(<TextAreaField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

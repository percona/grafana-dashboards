// Just a stub test
import { SelectTagsField } from './SelectTags';
import React from 'react';
import renderer from 'react-test-renderer';

xdescribe('SelectTags field test', () => {
  it('SelectTags renders correct without props', () => {
    const component = renderer.create(<SelectTagsField />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

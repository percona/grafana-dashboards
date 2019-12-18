// Just a stub test
import AddInstance from './AddInstance';
import React from 'react';
import renderer from 'react-test-renderer';

xdescribe('AddInstance page render test', () => {
  it('AddInstance renders correct without props', () => {
    const component = renderer.create(<AddInstance />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import { Form } from 'react-final-form';
import { shallow } from 'enzyme';
import { CheckboxField } from './Checkbox';

xdescribe('Checkbox field test', () => {
  it('Checkbox renders correct without props', () => {
    const tree = shallow(<Form onSubmit={jest.fn()} render={() => <CheckboxField name="test_field" />} />);

    expect(tree).toMatchSnapshot();
    tree.unmount();
  });
});

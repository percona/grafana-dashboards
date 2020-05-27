import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-final-form';
import { SelectField } from './Select';

xdescribe('Select field test', () => {
  it('Select renders correct without props', () => {
    const root = shallow(
      <Form onSubmit={jest.fn()} render={() => <SelectField defaultValue="tester" name="test_field" />} />
    );

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});

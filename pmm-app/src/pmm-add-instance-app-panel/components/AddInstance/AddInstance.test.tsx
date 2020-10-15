import React from 'react';
import { shallow, mount } from 'enzyme';
import AddInstance, { SelectInstance } from './AddInstance';

describe('AddInstance page:: ', () => {
  it('should render with correct amount of links correct', () => {
    const wrapper = shallow(<AddInstance onSelectInstanceType={() => {}} />);


    expect(wrapper?.find(SelectInstance).length).toEqual(5);
  });

  it('should invoke callback with right key', () => {
    const onSelectInstanceType = jest.fn();

    const wrapper = mount(<AddInstance onSelectInstanceType={onSelectInstanceType} />);

    expect(onSelectInstanceType).toBeCalledTimes(0);

    console.log(wrapper?.find('[data-qa="rds-instance"]'));

    wrapper?.find('[data-qa="rds-instance"]').simulate('click');

    expect(onSelectInstanceType).toBeCalledTimes(1);
    expect(onSelectInstanceType.mock.calls[0][0]).toStrictEqual({ type: 'rds' });
  });
});

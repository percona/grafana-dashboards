import React from 'react';
import {
  shallow, mount, ShallowWrapper, ReactWrapper,
} from 'enzyme';
import { AddInstance, SelectInstance } from './AddInstance';
import { instanceList } from './AddInstance.constants';

describe('AddInstance page:: ', () => {
  it('should render with correct amount of links correct', () => {
    const wrapper: ShallowWrapper = shallow(<AddInstance onSelectInstanceType={() => {}} />);

    expect(wrapper.find(SelectInstance).length).toEqual(instanceList.length);
  });

  it('should invoke callback with right key', () => {
    const onSelectInstanceType = jest.fn();

    const wrapper: ReactWrapper = mount(<AddInstance onSelectInstanceType={onSelectInstanceType} />);

    expect(onSelectInstanceType).toBeCalledTimes(0);

    wrapper.find('[data-qa="rds-instance"]').simulate('click');

    expect(onSelectInstanceType).toBeCalledTimes(1);
    expect(onSelectInstanceType.mock.calls[0][0]).toStrictEqual({ type: 'rds' });
  });
});

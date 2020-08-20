import React from 'react';
import { shallow, mount } from 'enzyme';
import { Input } from '@grafana/ui';
import { InputLabel } from 'shared/components/Form';
import { NumericInput } from './NumericInput';

describe('NumericInput::', () => {
  it('should render a Grafana Input element and two buttons', () => {
    const wrapper = shallow(<NumericInput />);

    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
    expect(wrapper.find(InputLabel)).toHaveLength(0);

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = shallow(<NumericInput disabled />);

    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(0);
    expect(wrapper.find(InputLabel)).toHaveLength(0);

    wrapper.unmount();
  });

  it('should hide arrow buttons when disabled', () => {
    const wrapper = shallow(<NumericInput className="testClass" />);

    expect(wrapper.at(0).hasClass('testClass')).toBe(true);

    wrapper.unmount();
  });

  it('should show a label if a label prop is passed', () => {
    const wrapper = shallow(<NumericInput label="test" />);

    expect(wrapper.find(InputLabel)).toHaveLength(1);
    expect(wrapper.find(InputLabel).text()).toEqual('test');
    expect(wrapper.find(InputLabel).at(0)).not.toHaveProperty('style');

    wrapper.unmount();
  });

  it('should set the label width as multiple of 8px when a labelWidth prop is passed', () => {
    const width = 20;

    const wrapper = shallow(<NumericInput label="test" labelWidth={width} />);

    expect(wrapper.find(InputLabel)).toHaveLength(1);
    expect(wrapper.find(InputLabel).at(0).prop('style')).toEqual({ width: width * 8, minWidth: 0 });

    wrapper.unmount();
  });

  it('should change the value when clicking on the arrow buttons', () => {
    const wrapper = mount(<NumericInput />);

    const mockedStepUp = jest.fn();
    const mockedStepDown = jest.fn();

    (wrapper.find('input').instance() as any).stepUp = mockedStepUp;
    (wrapper.find('input').instance() as any).stepDown = mockedStepDown;

    expect(mockedStepUp).toBeCalledTimes(0);
    expect(mockedStepDown).toBeCalledTimes(0);

    wrapper.find('button').at(0).simulate('click');

    expect(mockedStepUp).toBeCalledTimes(1);
    expect(mockedStepDown).toBeCalledTimes(0);

    wrapper.find('button').at(1).simulate('click');

    expect(mockedStepUp).toBeCalledTimes(1);
    expect(mockedStepDown).toBeCalledTimes(1);

    wrapper.unmount();
  });

  it('should trigger a change event when clicking on arrow buttons', () => {
    const mockedStepUp = jest.fn();
    const mockedStepDown = jest.fn();
    const mockedDispatchEvent = jest.fn();

    const wrapper = mount(<NumericInput />);

    (wrapper.find('input').instance() as any).stepUp = mockedStepUp;
    (wrapper.find('input').instance() as any).stepDown = mockedStepDown;
    (wrapper.find('input').instance() as any).dispatchEvent = mockedDispatchEvent;

    expect(mockedDispatchEvent).toBeCalledTimes(0);

    wrapper.find('button').at(0).simulate('click');

    expect(mockedDispatchEvent).toBeCalledTimes(1);
    expect(mockedDispatchEvent.mock.calls[0][0].type).toEqual('change');
    expect(mockedDispatchEvent.mock.calls[0][0].bubbles).toBe(true);

    wrapper.find('button').at(1).simulate('click');

    expect(mockedDispatchEvent).toBeCalledTimes(2);
    expect(mockedDispatchEvent.mock.calls[1][0].type).toEqual('change');
    expect(mockedDispatchEvent.mock.calls[1][0].bubbles).toBe(true);

    wrapper.unmount();
  });
});

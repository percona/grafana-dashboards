import React from 'react';
import { shallow } from 'enzyme';
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
});

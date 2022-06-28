import React from 'react';
import { shallow } from 'enzyme';
import { TooltipText } from './TooltipText';

describe('TooltipText::', () => {
  it('should render a header with a sum of failed checks', () => {
    const root = shallow(<TooltipText
      counts={{
        emergency: 1,
        critical: 1,
        alert: 1,
        error: 1,
        warning: 1,
        debug: 10,
        info: 2,
        notice: 3,
      }}
    />);

    expect(root.find('div > div').at(0).text()).toEqual('Failed checks: 20');

    root.unmount();
  });

  it('should render a body with failed checks detailed by severity', () => {
    const outer = shallow(<TooltipText
      counts={{
        emergency: 1,
        critical: 1,
        alert: 12,
        error: 1,
        warning: 1,
        debug: 1,
        info: 2,
        notice: 3,
      }}
    />);
    const root = outer.find('div > div > div');

    expect(root.at(0).text()).toEqual('Emergency – 1');
    expect(root.at(1).text()).toEqual('Alert – 12');
    expect(root.at(2).text()).toEqual('Critical – 1');
    expect(root.at(3).text()).toEqual('Error – 1');
    expect(root.at(4).text()).toEqual('Warning – 1');
    expect(root.at(5).text()).toEqual('Notice – 3');
    expect(root.at(6).text()).toEqual('Info – 2');
    expect(root.at(7).text()).toEqual('Debug – 1');

    root.unmount();
  });

  it('should render nothing when the sum is zero', () => {
    const outer = shallow(<TooltipText
      counts={{
        emergency: 0,
        critical: 0,
        alert: 0,
        error: 0,
        warning: 0,
        debug: 0,
        info: 0,
        notice: 0,
      }}
    />);
    const root = outer.find('div');

    expect(root.length).toEqual(0);

    root.unmount();
  });
});

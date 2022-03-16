import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip } from '@grafana/ui';
import { Failed } from './Failed';

describe('Failed::', () => {
  it('should render a sum of total failed checks with severity details', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          criticalCount: 1,
          majorCount: 0,
          trivialCount: 1,
        }, {
          serviceName: '',
          serviceId: '',
          criticalCount: 2,
          majorCount: 1,
          trivialCount: 5,
        }]}
        isSttEnabled
        hasNoAccess={false}
      />,
    );

    const spans = root.find('div a > span');

    expect(spans.at(0).text()).toEqual('3');
    expect(spans.at(2).text()).toEqual('1');
    expect(spans.at(4).text()).toEqual('6');
    root.unmount();
  });

  it('should render 0 when the sum of all checks is zero', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          criticalCount: 0,
          majorCount: 0,
          trivialCount: 0,
        }]}
        isSttEnabled
        hasNoAccess={false}
      />,
    );

    expect(root.find('div > span').text()).toEqual('0');
    root.unmount();
  });

  it('should render an inner tooltip component', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          criticalCount: 1,
          majorCount: 0,
          trivialCount: 1,
        }]}
        isSttEnabled
        hasNoAccess={false}
      />,
    );

    expect(root.find(Tooltip).length).toEqual(1);
    root.unmount();
  });

  it('should render a message when the user only has reader access', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          criticalCount: 1,
          majorCount: 0,
          trivialCount: 1,
        }]}
        isSttEnabled
        hasNoAccess
      />,
    );

    expect(root.find('[data-testid="unauthorized"]').text()).toEqual('Insufficient access permissions.');
    root.unmount();
  });
});

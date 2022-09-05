import React from 'react';
import { shallow } from 'enzyme';
import Tippy from '@tippyjs/react';
import { Failed } from './Failed';

describe('Failed::', () => {
  it('should render a sum of total failed checks with severity details', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          counts: {
            emergency: 0,
            critical: 1,
            alert: 0,
            error: 0,
            warning: 2,
            notice: 0,
            info: 0,
            debug: 0,
          },
        }, {
          serviceName: '',
          serviceId: '',
          counts: {
            emergency: 0,
            critical: 2,
            alert: 0,
            error: 0,
            warning: 0,
            notice: 0,
            info: 0,
            debug: 0,
          },
        }]}
        isSttEnabled
        hasNoAccess={false}
      />,
    );

    const spans = root.find('div a > span');

    expect(spans.at(0).text()).toEqual('3');
    expect(spans.at(2).text()).toEqual('0');
    expect(spans.at(4).text()).toEqual('2');
    expect(spans.at(6).text()).toEqual('0');
    root.unmount();
  });

  it('should render 0 when the sum of all checks is zero', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          counts: {
            critical: 0,
            warning: 0,
            notice: 0,
            alert: 0,
            info: 0,
            debug: 0,
            emergency: 0,
            error: 0,
          },
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
          counts: {
            critical: 1,
            warning: 0,
            notice: 1,
            alert: 0,
            info: 0,
            debug: 0,
            emergency: 0,
            error: 0,
          },
        }]}
        isSttEnabled
        hasNoAccess={false}
      />,
    );

    expect(root.find(Tippy).length).toEqual(1);
    root.unmount();
  });

  it('should render a message when the user only has reader access', () => {
    const root = shallow(
      <Failed
        failed={[{
          serviceName: '',
          serviceId: '',
          counts: {
            critical: 1,
            warning: 0,
            notice: 1,
            alert: 0,
            info: 0,
            debug: 0,
            emergency: 0,
            error: 0,
          },
        }]}
        isSttEnabled
        hasNoAccess
      />,
    );

    expect(root.find('[data-testid="unauthorized"]').text()).toEqual('Insufficient access permissions.');
    root.unmount();
  });
});

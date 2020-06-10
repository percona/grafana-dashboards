import React from 'react';
import { shallow } from 'enzyme';
import Settings from './Settings';

jest.mock('shared/components/helpers/notification-manager');

// TODO: add correct shallow renderer, we need to have something to render to 2nd level
describe('Settings Part test', () => {
  it('Checkbox renders correct without props', () => {
    const root = shallow(
      <Settings
        settings={{
          data_retention: '24h',
          metrics_resolutions: {
            hr: '60s',
            mr: '180s',
            lr: '300s',
          },
        }}
      />,
    );

    expect(root).toMatchSnapshot();
    root.unmount();
  });
});

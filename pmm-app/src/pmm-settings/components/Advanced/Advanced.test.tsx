import React from 'react';
import { mount } from 'enzyme';
import { dataQa } from '@percona/platform-core';
import { Advanced } from './Advanced';


describe('Advanced::', () => {
  it('Renders correctly with props', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updatesDisabled
      updateSettings={() => {}}
      publicAddress="pmmtest.percona.com"
    />);
    const retentionInput = root.find(dataQa('advanced-retention-input')).find('input');

    expect(retentionInput.prop('value')).toEqual(15);
  });

  it('Cant change telemetry when stt is on', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled
      sttEnabled
      updatesDisabled
      updateSettings={() => {}}
    />);
    const telemetrySwitch = root.find('[data-qa="advanced-telemetry"]').find('input');

    expect(telemetrySwitch.prop('disabled')).toBeTruthy();
  });

  it('Cant change stt when telemetry is off', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updatesDisabled
      updateSettings={() => {}}
    />);
    const sttSwitch = root.find('[data-qa="advanced-stt"]').find('input');

    expect(sttSwitch.prop('disabled')).toBeTruthy();
  });

  it('Calls apply changes', () => {
    const updateSettings = jest.fn();
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updatesDisabled
      updateSettings={updateSettings}
    />);

    root.find('[data-qa="advanced-retention-input"]')
      .find('input')
      .simulate('change', { target: { value: '70' } });
    root.find('form').simulate('submit');

    expect(updateSettings).toHaveBeenCalled();
  });

  xit('Sets correct URL from browser', () => {
    const oldLocation = window.location;

    delete window.location;
    window.location = Object.create({ ...oldLocation, hostname: 'pmmtest.percona.com' });

    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updatesDisabled
      updateSettings={() => {}}
    />);
    const publicAddressButton = root.find(dataQa('public-address-button')).find('button');

    publicAddressButton.simulate('click');
    root.update();

    const publicAddressInput = root.find(dataQa('publicAddress-text-input')).find('input');

    expect(publicAddressInput.prop('value')).toEqual('pmmtest.percona.com');
  });
});

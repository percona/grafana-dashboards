import React from 'react';
import { mount } from 'enzyme';
import { Advanced } from './Advanced';


describe('Advanced::', () => {
  it('Renders correctly with props', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updateSettings={() => {}}
    />);
    const retentionInput = root.find('[data-qa="advanced-retention-input"]');

    expect(retentionInput.prop('value')).toEqual(15);
  });

  it('Cant change telemetry when stt is on', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled
      sttEnabled
      updateSettings={() => {}}
    />);
    const telemetrySwitch = root.find('[data-qa="advanced-telemetry-switch"]').find('input');

    expect(telemetrySwitch.prop('className')).toContain('disabled');
  });

  it('Cant change stt when telemetry is off', () => {
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updateSettings={() => {}}
    />);
    const sttSwitch = root.find('[data-qa="advanced-stt-switch"]').find('input');

    expect(sttSwitch.prop('className')).toContain('disabled');
  });

  it('Calls apply changes', () => {
    const updateSettings = jest.fn();
    const root = mount(<Advanced
      dataRetention="1296000s"
      telemetryEnabled={false}
      sttEnabled={false}
      updateSettings={updateSettings}
    />);

    root.find('[data-qa="advanced-retention-input"]').simulate('change', { target: { value: '70' } });
    root.find('button').simulate('click');

    expect(updateSettings).toHaveBeenCalled();
  });
});

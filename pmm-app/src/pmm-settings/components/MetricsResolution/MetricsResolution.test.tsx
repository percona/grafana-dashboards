import React from 'react';
import { mount } from 'enzyme';
import { MetricsResolution } from './MetricsResolution';
import { defaultResolutions } from './MetricsResolution.constants';
import { removeUnits } from './MetricsResolution.utils';

describe('MetricsResolution::', () => {
  it('Renders correctly with props for standard resolution', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[1]}
      updateSettings={() => {}}
    />);
    const radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    const radioLabel = radio.childAt(1).find('label');
    const lrInput = root.find('[data-qa="metrics-resolution-lr-input"]');
    const mrInput = root.find('[data-qa="metrics-resolution-mr-input"]');
    const hrInput = root.find('[data-qa="metrics-resolution-hr-input"]');
    const standardRes = removeUnits(defaultResolutions[1]);

    expect(radioLabel.prop('className')).toContain('active');
    expect(lrInput.find('input').prop('value')).toEqual(standardRes.lr);
    expect(mrInput.find('input').prop('value')).toEqual(standardRes.mr);
    expect(hrInput.find('input').prop('value')).toEqual(standardRes.hr);
  });

  it('Renders correctly with props for rare resolution', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[0]}
      updateSettings={() => {}}
    />);
    const radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    const radioLabel = radio.childAt(0).find('label');
    const lrInput = root.find('[data-qa="metrics-resolution-lr-input"]');
    const mrInput = root.find('[data-qa="metrics-resolution-mr-input"]');
    const hrInput = root.find('[data-qa="metrics-resolution-hr-input"]');
    const standardRes = removeUnits(defaultResolutions[0]);

    expect(radioLabel.prop('className')).toContain('active');
    expect(lrInput.find('input').prop('value')).toEqual(standardRes.lr);
    expect(mrInput.find('input').prop('value')).toEqual(standardRes.mr);
    expect(hrInput.find('input').prop('value')).toEqual(standardRes.hr);
  });

  it('Renders correctly with props for frequent resolution', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[2]}
      updateSettings={() => {}}
    />);
    const radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    const radioLabel = radio.childAt(2).find('label');
    const lrInput = root.find('[data-qa="metrics-resolution-lr-input"]');
    const mrInput = root.find('[data-qa="metrics-resolution-mr-input"]');
    const hrInput = root.find('[data-qa="metrics-resolution-hr-input"]');
    const standardRes = removeUnits(defaultResolutions[2]);

    expect(radioLabel.prop('className')).toContain('active');
    expect(lrInput.find('input').prop('value')).toEqual(standardRes.lr);
    expect(mrInput.find('input').prop('value')).toEqual(standardRes.mr);
    expect(hrInput.find('input').prop('value')).toEqual(standardRes.hr);
  });

  it('Renders correctly with props for custom resolution', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={{ lr: '400s', mr: '100s', hr: '50s' }}
      updateSettings={() => {}}
    />);
    const radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    const radioLabel = radio.childAt(3).find('label');
    const lrInput = root.find('[data-qa="metrics-resolution-lr-input"]');
    const mrInput = root.find('[data-qa="metrics-resolution-mr-input"]');
    const hrInput = root.find('[data-qa="metrics-resolution-hr-input"]');

    expect(radioLabel.prop('className')).toContain('active');
    expect(lrInput.find('input').prop('value')).toEqual('400');
    expect(mrInput.find('input').prop('value')).toEqual('100');
    expect(hrInput.find('input').prop('value')).toEqual('50');
  });

  it('Changes input values when changing resolution', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[0]}
      updateSettings={() => {}}
    />);
    let radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    let radioLabelFrequent = radio.childAt(2).find('label');

    radioLabelFrequent.simulate('click');

    radio = root.find('[data-qa="metrics-resolution-radio-button-group"]');
    radioLabelFrequent = radio.childAt(2).find('label');

    const lrInput = root.find('[data-qa="metrics-resolution-lr-input"]');
    const mrInput = root.find('[data-qa="metrics-resolution-mr-input"]');
    const hrInput = root.find('[data-qa="metrics-resolution-hr-input"]');
    const standardRes = removeUnits(defaultResolutions[2]);

    expect(radioLabelFrequent.prop('className')).toContain('active');
    expect(lrInput.find('input').prop('value')).toEqual(standardRes.lr);
    expect(mrInput.find('input').prop('value')).toEqual(standardRes.mr);
    expect(hrInput.find('input').prop('value')).toEqual(standardRes.hr);
  });

  it('Disables apply changes on initial values', () => {
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[0]}
      updateSettings={() => {}}
    />);
    const button = root.find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });

  it('Calls apply changes', () => {
    const updateSettings = jest.fn();
    const root = mount(<MetricsResolution
      metricsResolutions={defaultResolutions[0]}
      updateSettings={updateSettings}
    />);

    root.find('[data-qa="metrics-resolution-lr-input"]')
      .find('input')
      .simulate('change', { target: { value: '70' } });
    root.find('form').simulate('submit');

    expect(updateSettings).toHaveBeenCalled();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { PTSummaryPanel } from './PTSummary';

const data = {
  series: [
    { values: { summary: { buffer: ['Test data'] } } }
  ],
};

describe('PTSummaryPanel::', () => {
  it('Renders correctly with props', () => {
    // @ts-ignore
    const root = mount(<PTSummaryPanel data={data} />);

    expect(root.find('pre').text()).toBe('Test data');
  });

  it('Renders correctly without data', () => {
    // @ts-ignore
    const root = mount(<PTSummaryPanel data={{ series: [] }} />);

    expect(root.find('pre').text()).toEqual('');
  });
});

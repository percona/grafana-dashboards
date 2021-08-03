import React from 'react';
import { mount } from 'enzyme';
import { PTSummaryPanel } from './PTSummary';

describe('PTSummaryPanel::', () => {
  it('Renders correctly with props', () => {
    const props: any = {
      data: {
        series: [{ fields: [{ name: 'summary', values: { buffer: ['Test data'] } }] }],
      },
    };
    const root = mount(<PTSummaryPanel {...props} />);

    expect(root.find('pre').text()).toBe('Test data');
  });

  it('Renders correctly without data', () => {
    const props: any = {
      data: {
        series: [],
      },
    };
    const root = mount(<PTSummaryPanel {...props} />);

    expect(root.find('pre').text()).toEqual('');
  });
});

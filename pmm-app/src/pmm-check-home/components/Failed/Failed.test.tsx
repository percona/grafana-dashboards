import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip } from '@grafana/ui';
import { Failed } from './Failed';

describe('Failed::', () => {
  it('should render a sum of total failed checks with severity details', () => {
    const root = shallow(<Failed failed={[1, 0, 1]} isSttEnabled />);

    const spans = root.find('div a > span');
    expect(spans.at(0).text()).toEqual('1');
    expect(spans.at(2).text()).toEqual('0');
    expect(spans.at(4).text()).toEqual('1');
  });

  it('should render an inner tooltip component', () => {
    const root = shallow(<Failed failed={[1, 0, 1]} isSttEnabled />);

    expect(root.find(Tooltip).length).toEqual(1);
  });
});

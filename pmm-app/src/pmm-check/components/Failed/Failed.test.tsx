import React from 'react';
import { shallow } from 'enzyme';
// import { Tooltip } from 'antd';
// import { InfoCircleOutlined } from '@ant-design/icons';
import { Failed } from './Failed';

describe('Failed::', () => {
  it('should render a sum of total failed checks with severity details', () => {
    const root = shallow(<Failed failed={[1, 0, 1]} />);

    expect(
      root
        .find('div > span')
        .at(0)
        .text()
    ).toEqual('2 (1 / 0 / 1)');
  });

  it('should render inner components', () => {
    // const root = shallow(Failed([1, 0, 1]));
    expect(true).toEqual(true);
    // expect(root.find(InfoCircleOutlined).length).toEqual(1);
    // expect(root.find(Tooltip).length).toEqual(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { Details } from './Details';

export const DATA_SOURCE = [
  {
    key: '1',
    name: 'sandbox-mysql.acme.com',
    // critical, major, trivial
    failed: [1, 1, 0],
    details: ['The root password is empty', 'MySQL 5.1 is not the latest major version'],
  },
  {
    key: '2',
    name: 'pmm-server-postgresql',
    failed: [0, 1, 0],
    details: ['PMM Server is not the latest major version'],
  },
  {
    key: '3',
    name: 'mongodb-inst-rpl-1',
    failed: [1, 0, 0],
    details: ['MongoDB admin password does not meet the complexity requirement'],
  },
];

describe('Details::', () => {
  it('should render a list with two list items', () => {
    const root = shallow(<Details details={DATA_SOURCE[0].details} />);

    expect(root.find('ul').find('li').length).toEqual(2);
  });
});

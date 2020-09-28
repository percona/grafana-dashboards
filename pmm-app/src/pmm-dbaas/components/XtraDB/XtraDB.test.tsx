import React from 'react';
import { mount } from 'enzyme';
import { XtraDB } from './XtraDB';

jest.mock('shared/components/helpers/notification-manager');

describe('XtraDB::', () => {
  it('renders correctly without clusters', () => {
    const root = mount(
      <XtraDB kubernetes={[]} />
    );

    expect(root.find('[data-qa="xtradb-add-cluster-button"]').find('button').length).toBe(2);
    expect(root.contains('table')).toBeFalsy();
  });
});

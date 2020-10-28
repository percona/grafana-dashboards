import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from 'react-final-form';
import { XtraDBClusterBasicOptions } from './XtraDBClusterBasicOptions';
import { AddXtraDBFields } from '../AddXtraDBModal.types';

describe('XtraDBClusterBasicOptions::', () => {
  it('renders correctly', () => {
    const root = shallow(<Form
      onSubmit={jest.fn()}
      render={() => <XtraDBClusterBasicOptions kubernetesOptions={[]} />}
    />);

    expect(root.find('[data-qa="name-text-input"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-kubernetes-cluster-field"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-database-type-field"]')).toBeTruthy();
  });
  it('renders correctly with default values', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.name]: 'dbcluster',
      }}
      onSubmit={jest.fn()}
      render={() => <XtraDBClusterBasicOptions kubernetesOptions={[]} />}
    />);
    const name = root.find('[data-qa="name-text-input"]');

    expect(name.prop('value')).toEqual('dbcluster');
  });
});

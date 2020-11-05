import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { DBClusterBasicOptions } from './DBClusterBasicOptions';
import { AddDBClusterFields } from '../AddDBClusterModal.types';

describe('DBClusterBasicOptions::', () => {
  it('renders correctly', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={({ form }: FormRenderProps) => (
        <DBClusterBasicOptions kubernetesOptions={[]} form={form} />
      )}
    />);

    expect(root.find('[data-qa="name-text-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-kubernetes-cluster-field"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-database-type-field"]')).toBeTruthy();
  });
  it('renders correctly with default values', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.name]: 'dbcluster',
      }}
      onSubmit={jest.fn()}
      render={({ form }: FormRenderProps) => (
        <DBClusterBasicOptions kubernetesOptions={[]} form={form} />
      )}
    />);
    const name = root.find('[data-qa="name-text-input"]');

    expect(name.prop('value')).toEqual('dbcluster');
  });
});

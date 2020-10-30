import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { XtraDBClusterBasicOptions } from './XtraDBClusterBasicOptions';
import { AddXtraDBFields } from '../AddXtraDBModal.types';

describe('XtraDBClusterBasicOptions::', () => {
  it('renders correctly', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={({ form }: FormRenderProps) => (
        <XtraDBClusterBasicOptions kubernetesOptions={[]} form={form} />
      )}
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
      render={({ form }: FormRenderProps) => (
        <XtraDBClusterBasicOptions kubernetesOptions={[]} form={form} />
      )}
    />);
    const name = root.find('[data-qa="name-text-input"]');

    expect(name.prop('value')).toEqual('dbcluster');
  });
});

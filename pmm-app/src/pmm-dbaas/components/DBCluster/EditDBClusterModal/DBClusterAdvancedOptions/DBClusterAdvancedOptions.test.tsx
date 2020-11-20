import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { Databases } from 'shared/core';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions';
import { EditDBClusterFields } from '../EditDBClusterModal.types';
import { DBClusterResources } from './DBClusterAdvancedOptions.types';

describe('DBClusterAdvancedOptions::', () => {
  it('renders correctly', () => {
    const root = mount(
      <Form onSubmit={jest.fn()} render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} />} />,
    );

    expect(root.find('[data-qa="dbcluster-topology-field"]')).toBeTruthy();
    expect(root.find('[data-qa="nodes-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-resources-field"]')).toBeTruthy();
    expect(root.find('[data-qa="memory-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="cpu-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="disk-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-create-cluster-button"]')).toBeTruthy();
  });

  it('should disable memory, cpu and disk when resources are not custom', () => {
    const root = mount(
      <Form
        initialValues={{
          [EditDBClusterFields.resources]: DBClusterResources.small,
        }}
        onSubmit={jest.fn()}
        render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
      />,
    );
    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');
    const disk = root.find('[data-qa="disk-number-input"]');

    expect(memory.prop('disabled')).toBeTruthy();
    expect(cpu.prop('disabled')).toBeTruthy();
    expect(disk.prop('disabled')).toBeTruthy();
  });

  it('should enable memory and cpu when resources are custom, disk should be disabled', () => {
    const root = mount(
      <Form
        initialValues={{
          [EditDBClusterFields.resources]: DBClusterResources.small,
        }}
        onSubmit={jest.fn()}
        render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
      />,
    );
    const resourcesWrapper = root.find('[data-qa="dbcluster-resources-field"]');

    resourcesWrapper
      .find('label')
      .at(3)
      .simulate('click');

    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');
    const disk = root.find('[data-qa="disk-number-input"]');

    expect(memory.prop('disabled')).toBeFalsy();
    expect(cpu.prop('disabled')).toBeFalsy();
    expect(disk.prop('disabled')).toBeTruthy();
  });

  it('should disable button when invalid', () => {
    const root = mount(
      <Form onSubmit={jest.fn()} render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} />} />,
    );
    const button = root.find('[data-qa="dbcluster-update-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });

  it('should enable button when valid', () => {
    const root = mount(
      <Form
        onSubmit={jest.fn()}
        render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} valid pristine={false} />}
      />,
    );
    const button = root.find('[data-qa="dbcluster-update-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeFalsy();
  });

  it('should disabled single node topology when database is MongoDB', () => {
    const root = mount(
      <Form
        initialValues={{
          [EditDBClusterFields.databaseType]: Databases.mongodb,
        }}
        onSubmit={jest.fn()}
        render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
      />,
    );
    const topology = root.find('[data-qa="dbcluster-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).toContain('disabled');
  });

  it('should enable single node topology when database is MySQL', () => {
    const root = mount(
      <Form
        initialValues={{
          [EditDBClusterFields.databaseType]: Databases.mysql,
        }}
        onSubmit={jest.fn()}
        render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
      />,
    );
    const topology = root.find('[data-qa="dbcluster-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).not.toContain('disabled');
  });
});

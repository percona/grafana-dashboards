import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { Databases } from 'shared/core';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions';
import { AddDBClusterFields } from '../AddDBClusterModal.types';
import { DBClusterResources, DBClusterTopology } from './DBClusterAdvancedOptions.types';

describe('DBClusterAdvancedOptions::', () => {
  it('renders correctly', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);

    expect(root.find('[data-qa="dbcluster-topology-field"]')).toBeTruthy();
    expect(root.find('[data-qa="nodes-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-resources-field"]')).toBeTruthy();
    expect(root.find('[data-qa="memory-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="cpu-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="dbcluster-create-cluster-button"]')).toBeTruthy();
  });
  it('renders correctly with initial values', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.topology]: DBClusterTopology.cluster,
        [AddDBClusterFields.nodes]: 3,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const nodes = root.find('[data-qa="nodes-number-input"]');
    const topologyWrapper = root.find('[data-qa="dbcluster-topology-field"]');

    expect(nodes.prop('value')).toBe(3);
    expect(topologyWrapper.find('label').at(0).prop('className')).toContain('active');
  });
  it('should set nodes to 1 when topology is single', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const topologyWrapper = root.find('[data-qa="dbcluster-topology-field"]');

    topologyWrapper.find('label').at(1).simulate('click');

    expect(root.find('[data-qa="single-number-input"]')).toBeTruthy();
  });
  it('should disable memory and cpu when resources are not custom', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.resources]: DBClusterResources.small,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');

    expect(memory.prop('disabled')).toBeTruthy();
    expect(cpu.prop('disabled')).toBeTruthy();
  });
  it('should enable memory and cpu when resources is custom', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.resources]: DBClusterResources.small,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const resourcesWrapper = root.find('[data-qa="dbcluster-resources-field"]');

    resourcesWrapper.find('label').at(3).simulate('click');

    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');

    expect(memory.prop('disabled')).toBeFalsy();
    expect(cpu.prop('disabled')).toBeFalsy();
  });
  it('should disable button when invalid', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const button = root.find('[data-qa="dbcluster-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });
  it('should enable button when valid', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => (
        <DBClusterAdvancedOptions
          {...renderProps}
          valid
          pristine={false}
        />
      )}
    />);
    const button = root.find('[data-qa="dbcluster-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeFalsy();
  });
  it('should disabled single node topology when database is MongoDB', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.databaseType]: {
          value: Databases.mongodb,
          key: Databases.mongodb,
        },
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const topology = root.find('[data-qa="dbcluster-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).toContain('disabled');
  });
  it('should enable single node topology when database is MySQL', () => {
    const root = mount(<Form
      initialValues={{
        [AddDBClusterFields.databaseType]: {
          value: Databases.mysql,
          key: Databases.mysql,
        },
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <DBClusterAdvancedOptions {...renderProps} />}
    />);
    const topology = root.find('[data-qa="dbcluster-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).not.toContain('disabled');
  });
});

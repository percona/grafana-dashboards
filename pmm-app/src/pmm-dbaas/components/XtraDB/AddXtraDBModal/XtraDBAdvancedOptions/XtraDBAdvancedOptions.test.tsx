import React from 'react';
import { mount } from 'enzyme';
import { Form, FormRenderProps } from 'react-final-form';
import { Databases } from 'shared/core';
import { XtraDBAdvancedOptions } from './XtraDBAdvancedOptions';
import { AddXtraDBFields } from '../AddXtraDBModal.types';
import { XtraDBResources, XtraDBTopology } from './XtraDBAdvancedOptions.types';

describe('XtraDBAdvancedOptions::', () => {
  it('renders correctly', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);

    expect(root.find('[data-qa="xtradb-topology-field"]')).toBeTruthy();
    expect(root.find('[data-qa="nodes-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-resources-field"]')).toBeTruthy();
    expect(root.find('[data-qa="memory-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="cpu-number-input"]')).toBeTruthy();
    expect(root.find('[data-qa="xtradb-create-cluster-button"]')).toBeTruthy();
  });
  it('renders correctly with initial values', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.topology]: XtraDBTopology.cluster,
        [AddXtraDBFields.nodes]: 3,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const nodes = root.find('[data-qa="nodes-number-input"]');
    const topologyWrapper = root.find('[data-qa="xtradb-topology-field"]');

    expect(nodes.prop('value')).toBe(3);
    expect(topologyWrapper.find('label').at(0).prop('className')).toContain('active');
  });
  it('should set nodes to 1 when topology is single', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const topologyWrapper = root.find('[data-qa="xtradb-topology-field"]');

    topologyWrapper.find('label').at(1).simulate('click');

    expect(root.find('[data-qa="single-number-input"]')).toBeTruthy();
  });
  it('should disable memory and cpu when resources are not custom', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.resources]: XtraDBResources.small,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');

    expect(memory.prop('disabled')).toBeTruthy();
    expect(cpu.prop('disabled')).toBeTruthy();
  });
  it('should enable memory and cpu when resources is custom', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.resources]: XtraDBResources.small,
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const resourcesWrapper = root.find('[data-qa="xtradb-resources-field"]');

    resourcesWrapper.find('label').at(3).simulate('click');

    const memory = root.find('[data-qa="memory-number-input"]');
    const cpu = root.find('[data-qa="cpu-number-input"]');

    expect(memory.prop('disabled')).toBeFalsy();
    expect(cpu.prop('disabled')).toBeFalsy();
  });
  it('should disable button when invalid', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const button = root.find('[data-qa="xtradb-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeTruthy();
  });
  it('should enable button when valid', () => {
    const root = mount(<Form
      onSubmit={jest.fn()}
      render={(renderProps) => (
        <XtraDBAdvancedOptions
          {...renderProps}
          valid
          pristine={false}
        />
      )}
    />);
    const button = root.find('[data-qa="xtradb-create-cluster-button"]').find('button');

    expect(button.prop('disabled')).toBeFalsy();
  });
  it('should disabled single node topology when database is MongoDB', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.databaseType]: {
          value: Databases.mongodb,
          key: Databases.mongodb,
        },
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const topology = root.find('[data-qa="xtradb-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).toContain('disabled');
  });
  it('should enable single node topology when database is MySQL', () => {
    const root = mount(<Form
      initialValues={{
        [AddXtraDBFields.databaseType]: {
          value: Databases.mysql,
          key: Databases.mysql,
        },
      }}
      onSubmit={jest.fn()}
      render={(renderProps: FormRenderProps) => <XtraDBAdvancedOptions {...renderProps} />}
    />);
    const topology = root.find('[data-qa="xtradb-topology-field"]');
    const singleLabel = topology.find('label').at(1);

    expect(singleLabel.prop('className')).not.toContain('disabled');
  });
});

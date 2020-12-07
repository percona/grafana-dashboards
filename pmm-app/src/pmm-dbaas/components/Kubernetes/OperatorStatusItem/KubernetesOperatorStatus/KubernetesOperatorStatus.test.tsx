import React from 'react';
import { shallow } from 'enzyme';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { KubernetesOperatorStatus } from './KubernetesOperatorStatus';

describe('DBClusterStatus::', () => {
  it('renders correctly when active', () => {
    const root = shallow(
      <KubernetesOperatorStatus
        status={Status.ready}
        errorMessage="Should not render error"
      />,
    );
    const span = root.find('span');

    expect(root.find('[data-qa="cluster-status-active"]')).toBeTruthy();
    expect(span.prop('className')).toContain('active');
    expect(span.prop('title')).toEqual('');
  });
  it('renders correctly when failed', () => {
    const root = shallow(
      <KubernetesOperatorStatus
        status={Status.failed}
        errorMessage="Test error"
      />,
    );
    const span = root.find('span');

    expect(root.find('[data-qa="cluster-status-failse"]')).toBeTruthy();
    expect(span.prop('className')).toContain('failed');
    expect(span.prop('title')).toEqual('Test error');
  });
  it('renders correctly when changing', () => {
    const root = shallow(
      <KubernetesOperatorStatus
        status={Status.changing}
        errorMessage="Should not render error"
      />,
    );
    const span = root.find('span');

    expect(root.find('[data-qa="cluster-status-pending"]')).toBeTruthy();
    expect(span.prop('className')).not.toContain('active');
    expect(span.prop('title')).toEqual('');
  });
});

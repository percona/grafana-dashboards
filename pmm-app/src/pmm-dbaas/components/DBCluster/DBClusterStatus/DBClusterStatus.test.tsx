import React from 'react';
import { shallow } from 'enzyme';
import { DBClusterStatus as Status } from '../DBCluster.types';
import { DBClusterStatus } from './DBClusterStatus';

describe('DBClusterStatus::', () => {
  it('renders correctly when active', () => {
    const root = shallow(<DBClusterStatus status={Status.ready} errorMessage="Should not render error" />);
    const span = root.find('span');

    expect(root.find('[data-qa="cluster-status-active"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-status-error-message"]')).toBeFalsy();
    expect(span.prop('className')).toContain('active');
  });
  it('renders correctly when failed', () => {
    const root = shallow(<DBClusterStatus status={Status.failed} errorMessage="Test error" />);
    const span = root.find('span');
    const errorMessage = root.find('[data-qa="cluster-status-error-message"]');

    expect(root.find('[data-qa="cluster-status-failse"]')).toBeTruthy();
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.prop('title')).toEqual('Test error');
    expect(span.prop('className')).toContain('failed');
  });
  it('renders correctly when changing', () => {
    const root = shallow(<DBClusterStatus status={Status.changing} errorMessage="Should not render error" />);
    const span = root.find('span');

    expect(root.find('[data-qa="cluster-status-pending"]')).toBeTruthy();
    expect(root.find('[data-qa="cluster-status-error-message"]')).toBeFalsy();
    expect(span.prop('className')).not.toContain('active');
  });
});

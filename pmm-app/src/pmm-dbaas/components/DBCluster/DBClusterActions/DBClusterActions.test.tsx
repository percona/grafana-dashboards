import React from 'react';
import { mount, shallow } from 'enzyme';
import { dataQa } from '@percona/platform-core';
import { MultipleActions } from 'pmm-dbaas/components/MultipleActions/MultipleActions';
import { act } from 'react-dom/test-utils';
import { dbClustersStub } from '../__mocks__/dbClustersStubs';
import { DBClusterStatus } from '../DBCluster.types';
import { DBClusterActions } from './DBClusterActions';

jest.mock('shared/components/helpers/notification-manager');
jest.mock('../XtraDB.service');

describe('DBClusterActions::', () => {
  it('renders correctly', () => {
    const root = shallow(
      <DBClusterActions
        dbCluster={dbClustersStub[0]}
        setSelectedCluster={jest.fn()}
        setDeleteModalVisible={jest.fn()}
        setEditModalVisible={jest.fn()}
        getDBClusters={jest.fn()}
      />,
    );

    expect(root.find(MultipleActions)).toBeTruthy();
  });
  it('doesnt disable button if cluster is ready', () => {
    const root = mount(
      <DBClusterActions
        dbCluster={dbClustersStub[0]}
        setSelectedCluster={jest.fn()}
        setDeleteModalVisible={jest.fn()}
        setEditModalVisible={jest.fn()}
        getDBClusters={jest.fn()}
      />,
    );

    expect(root.find('button').prop('disabled')).toBeFalsy();
  });
  it('disables button if cluster changing', () => {
    const root = mount(
      <DBClusterActions
        dbCluster={{ ...dbClustersStub[0], status: DBClusterStatus.changing }}
        setSelectedCluster={jest.fn()}
        setDeleteModalVisible={jest.fn()}
        setEditModalVisible={jest.fn()}
        getDBClusters={jest.fn()}
      />,
    );

    expect(root.find('button').prop('disabled')).toBeTruthy();
  });
  it('calls delete action correctly', async () => {
    const setSelectedCluster = jest.fn();
    const setDeleteModalVisible = jest.fn();
    const root = mount(
      <DBClusterActions
        dbCluster={dbClustersStub[0]}
        setSelectedCluster={setSelectedCluster}
        setDeleteModalVisible={setDeleteModalVisible}
        setEditModalVisible={jest.fn()}
        getDBClusters={jest.fn()}
      />,
    );

    await act(async () => {
      const button = root.find('button');

      button.simulate('click');
    });

    root.update();

    const menu = root.find(dataQa('dropdown-menu-menu'));
    const action = menu.find('span').at(0);

    action.simulate('click');

    expect(setSelectedCluster).toHaveBeenCalled();
    expect(setDeleteModalVisible).toHaveBeenCalled();
  });
  it('calls restart action correctly', async () => {
    const getDBClusters = jest.fn();
    const root = mount(
      <DBClusterActions
        dbCluster={dbClustersStub[0]}
        setSelectedCluster={jest.fn()}
        setDeleteModalVisible={jest.fn()}
        setEditModalVisible={jest.fn()}
        getDBClusters={getDBClusters}
      />,
    );

    await act(async () => {
      const button = root.find('button');

      button.simulate('click');
    });

    root.update();

    const menu = root.find(dataQa('dropdown-menu-menu'));

    await act(async () => {
      const action = menu.find('span').at(1);

      action.simulate('click');
    });

    expect(getDBClusters).toHaveBeenCalled();
  });
});

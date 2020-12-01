import React, {
  FC,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useStyles } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table/Table';
import { Settings } from 'pmm-settings/Settings.types';
import { SettingsService } from 'pmm-settings/Settings.service';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddClusterButton } from '../AddClusterButton/AddClusterButton';
import { getStyles } from './DBCluster.styles';
import { DBCluster as Cluster, DBClusterProps } from './DBCluster.types';
import { AddDBClusterModal } from './AddDBClusterModal/AddDBClusterModal';
import { EditDBClusterModal } from './EditDBClusterModal/EditDBClusterModal';
import { useDBClusters } from './DBCluster.hooks';
import {
  clusterStatusRender,
  connectionRender,
  databaseTypeRender,
  parametersRender,
  clusterNameRender,
  clusterActionsRender,
} from './ColumnRenderers/ColumnRenderers';
import { DeleteDBClusterModal } from './DeleteDBClusterModal/DeleteDBClusterModal';
// import { buildWarningMessage } from './DBCluster.utils';

export const DBCluster: FC<DBClusterProps> = ({ kubernetes }) => {
  const styles = useStyles(getStyles);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster>();
  const [dbClusters, getDBClusters, loading] = useDBClusters(kubernetes);
  const [settings, setSettings] = useState<Settings>();
  const [settingsLoading, setSettingsLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: Messages.dbcluster.table.nameColumn,
        accessor: clusterNameRender,
      },
      {
        Header: Messages.dbcluster.table.databaseTypeColumn,
        accessor: databaseTypeRender,
      },
      {
        Header: Messages.dbcluster.table.connectionColumn,
        accessor: connectionRender,
      },
      {
        Header: Messages.dbcluster.table.clusterParametersColumn,
        accessor: parametersRender,
      },
      {
        Header: Messages.dbcluster.table.clusterStatusColumn,
        accessor: clusterStatusRender,
      },
      {
        Header: Messages.dbcluster.table.actionsColumn,
        accessor: clusterActionsRender({
          setSelectedCluster,
          setDeleteModalVisible,
          setEditModalVisible,
          getDBClusters,
        }),
      },
    ],
    [setSelectedCluster, setDeleteModalVisible, getDBClusters],
  );

  const kubernetesOptions = kubernetes.map(({ kubernetesClusterName }) => ({
    value: kubernetesClusterName,
    label: kubernetesClusterName,
  }));
  const AddNewClusterButton = useCallback(
    () => (
      <AddClusterButton
        label={Messages.dbcluster.addAction}
        // disabled={settingsLoading || !settings?.publicAddress}
        // showWarning={!settingsLoading && !settings?.publicAddress}
        // warningMessage={buildWarningMessage(styles.settingsLink)}
        action={() => setAddModalVisible(!addModalVisible)}
        data-qa="dbcluster-add-cluster-button"
      />
    ),
    [addModalVisible, settingsLoading, settings],
  );
  const getSettings = useCallback(() => {
    SettingsService.getSettings(setSettingsLoading, setSettings);
  }, []);

  useEffect(() => getSettings(), []);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.actionPanel}>
        <AddNewClusterButton />
      </div>
      <AddDBClusterModal
        kubernetesOptions={kubernetesOptions}
        isVisible={addModalVisible}
        setVisible={setAddModalVisible}
        onDBClusterAdded={getDBClusters}
      />
      <DeleteDBClusterModal
        isVisible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onClusterDeleted={getDBClusters}
        selectedCluster={selectedCluster}
      />
      <EditDBClusterModal
        isVisible={editModalVisible}
        setVisible={setEditModalVisible}
        onDBClusterChanged={getDBClusters}
        selectedCluster={selectedCluster}
      />
      <Table columns={columns} data={dbClusters} loading={loading} noData={<AddNewClusterButton />} />
    </div>
  );
};

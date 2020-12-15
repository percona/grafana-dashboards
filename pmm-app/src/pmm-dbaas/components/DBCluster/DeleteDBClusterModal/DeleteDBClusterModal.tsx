import React, { FC, useCallback } from 'react';
import { Button, HorizontalGroup, useStyles } from '@grafana/ui';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { DATABASE_LABELS } from 'shared/core';
import { DeleteDBClusterModalProps } from './DeleteDBClusterModal.types';
import { getStyles } from './DeleteDBClusterModal.styles';
import { DBClusterServiceFactory } from '../DBClusterService.factory';

export const DeleteDBClusterModal: FC<DeleteDBClusterModalProps> = ({
  isVisible,
  setVisible,
  onClusterDeleted,
  selectedCluster,
}) => {
  const styles = useStyles(getStyles);

  const deleteDBCluster = useCallback(async () => {
    if (!selectedCluster) {
      setVisible(false);

      return;
    }

    try {
      const dbClusterService = DBClusterServiceFactory.newDBClusterService(selectedCluster?.databaseType);

      await dbClusterService.deleteDBClusters(selectedCluster);
      setVisible(false);
      onClusterDeleted();
    } catch (e) {
      console.error(e);
    }
  }, [selectedCluster]);

  return (
    <Modal
      title={Messages.dbcluster.deleteModal.title}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
    >
      <h4 className={styles.deleteModalContent}>
        Are you sure that you want to delete
        <span className={styles.namesHighlight}>{` ${DATABASE_LABELS[selectedCluster?.databaseType]} `}</span>
        cluster
        <span className={styles.namesHighlight}>{` ${selectedCluster?.clusterName} `}</span>
        from Kubernetes cluster
        <span className={styles.namesHighlight}>{` ${selectedCluster?.kubernetesClusterName} `}</span>
      </h4>
      <HorizontalGroup justify="space-between" spacing="md">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setVisible(false)}
          data-qa="cancel-delete-dbcluster-button"
        >
          {Messages.dbcluster.deleteModal.cancel}
        </Button>
        <Button
          variant="destructive"
          size="md"
          onClick={deleteDBCluster}
          data-qa="delete-dbcluster-button"
        >
          {Messages.dbcluster.deleteModal.confirm}
        </Button>
      </HorizontalGroup>
    </Modal>
  );
};

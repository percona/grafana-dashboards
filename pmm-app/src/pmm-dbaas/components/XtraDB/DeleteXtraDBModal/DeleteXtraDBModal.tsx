import React, { FC } from 'react';
import { Button, HorizontalGroup, useStyles } from '@grafana/ui';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddXtraDBModalProps } from './AddXtraDBModal.types';
import { XtraDBService } from '../XtraDB.service';
import { XtraDBCluster } from '../XtraDB.types';
import { getStyles } from './DeleteXtraDBModal.styles';

export const DeleteXtraDBModal: FC<AddXtraDBModalProps> = ({
  isVisible,
  setVisible,
  onClusterDeleted,
  selectedCluster,
}) => {
  const styles = useStyles(getStyles);

  const deleteXtraDBCluster = async (xtraDBCluster: XtraDBCluster) => {
    try {
      await XtraDBService.deleteXtraDBClusters(xtraDBCluster);
      setVisible(false);
      onClusterDeleted();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  return (
    <Modal
      title={Messages.kubernetes.deleteModal.title}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
    >
      <h4 className={styles.deleteModalContent}>{Messages.kubernetes.deleteModal.confirmMessage}</h4>
      <HorizontalGroup justify="space-between" spacing="md">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setVisible(false)}
          data-qa="cancel-delete-xtradbcluster-button"
        >
          {Messages.kubernetes.deleteModal.cancel}
        </Button>
        <Button
          variant="destructive"
          size="md"
          onClick={() => {
            deleteXtraDBCluster(selectedCluster);
            setVisible(false);
          }}
          data-qa="delete-xtradbcluster-button"
        >
          {Messages.kubernetes.deleteModal.confirm}
        </Button>
      </HorizontalGroup>
    </Modal>
  );
};

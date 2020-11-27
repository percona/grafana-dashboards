import React, { FC, useEffect, useState } from 'react';
import { Button, HorizontalGroup } from '@grafana/ui';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { DeleteDBClusterModalProps } from './ViewClusterConfigModal.types';
import { KubernetesService } from '../../Kubernetes/Kubernetes.service';
import { Overlay } from '../../../../shared/components/Elements/Overlay/Overlay';
import { ReactJSON } from '../../../../shared/components/Elements/ReactJSON/ReactJSON';
import { showSuccessNotification } from '../../../../shared/components/helpers';
import { css } from 'emotion';

export const ViewClusterConfigModal: FC<DeleteDBClusterModalProps> = ({
  isVisible,
  setVisible,
  selectedCluster,
}) => {
  const [kubeconfig, setKubeconfig] = useState({});
  const [loading, setLoading] = useState(false);

  const onConfigCopy = () => {
    showSuccessNotification({ message: 'Copied' });
  };

  useEffect(() => {
    const getClusters = async () => {
      if (!selectedCluster) {
        setVisible(false);
        return;
      }

      setLoading(true);
      try {
        const config = await KubernetesService.getKubernetesConfig(selectedCluster);
        setKubeconfig(config);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getClusters();
  }, [selectedCluster]);

  return (
    <Modal title={'View cluster config'} isVisible={isVisible} onClose={() => setVisible(false)}>
      <Overlay
        isPending={loading}
        className={css`
          height: 50vh;
          overflow: scroll;
        `}
      >
        {/*<Scrollbar style={{ maxHeight: '50vh', marginBottom: '30px' }}>*/}
        {/*  <ReactJSON json={kubeconfig} />*/}
        {/*</Scrollbar>*/}
        <ReactJSON json={kubeconfig} />
      </Overlay>
      <HorizontalGroup justify="flex-end" spacing="md">
        <Button variant="secondary" size="md" onClick={onConfigCopy} data-qa="cancel-delete-dbcluster-button">
          {'Copy config'}
        </Button>
        <Button
          variant="destructive"
          size="md"
          onClick={() => setVisible(false)}
          data-qa="delete-dbcluster-button"
        >
          {'Close'}
        </Button>
      </HorizontalGroup>
    </Modal>
  );
};

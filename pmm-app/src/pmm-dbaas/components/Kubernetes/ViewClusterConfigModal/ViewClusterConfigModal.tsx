import React, {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { Button, ClipboardButton, HorizontalGroup } from '@grafana/ui';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { css } from 'emotion';
import { ViewKubernetesClusterModalProps } from './ViewClusterConfigModal.types';
import { KubernetesService } from '../Kubernetes.service';
import { Overlay } from '../../../../shared/components/Elements/Overlay/Overlay';
import { showSuccessNotification } from '../../../../shared/components/helpers';
import * as styles from '../../../../pmm-update/components/ProgressModal/ProgressModal.styles';
import { Messages } from '../../../../pmm-update/components/ProgressModal/ProgressModal.messages';

export const ViewClusterConfigModal: FC<ViewKubernetesClusterModalProps> = ({
  isVisible,
  setVisible,
  selectedCluster,
}) => {
  const [kubeconfig, setKubeconfig] = useState('');
  const [loading, setLoading] = useState(false);
  const outputRef = useRef<HTMLPreElement>(null);


  const copyToClipboard = useCallback(() => {
    showSuccessNotification({ message: 'Copied' });

    return outputRef.current?.textContent || '';
  }, [outputRef]);

  useEffect(() => {
    const getClusters = async () => {
      if (!selectedCluster?.kubernetesClusterName) {
        setVisible(false);

        return;
      }

      setLoading(true);
      try {
        const config = await KubernetesService.getKubernetesConfig(selectedCluster);

        setKubeconfig(config.kube_auth.kubeconfig);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getClusters();
  }, [selectedCluster]);

  return (
    <Modal title="View cluster config" isVisible={isVisible} onClose={() => setVisible(false)}>
      <HorizontalGroup justify="flex-start" spacing="md">
        <ClipboardButton
          getText={copyToClipboard}
          className={styles.clipboardButton}
          variant="secondary"
          size="sm"
        >
          {Messages.copyToClipboard}
        </ClipboardButton>
      </HorizontalGroup>
      <Overlay
        isPending={loading}
        className={css`
          height: 50vh;
          overflow: scroll;
          margin-top: 10px;
          margin-bottom: 10px;
        `}
      >
        <pre ref={outputRef}>{kubeconfig}</pre>
      </Overlay>
      <HorizontalGroup justify="flex-end" spacing="md">
        <Button
          variant="destructive"
          size="md"
          onClick={() => setVisible(false)}
          data-qa="delete-dbcluster-button"
        >
          Close
        </Button>
      </HorizontalGroup>
    </Modal>
  );
};

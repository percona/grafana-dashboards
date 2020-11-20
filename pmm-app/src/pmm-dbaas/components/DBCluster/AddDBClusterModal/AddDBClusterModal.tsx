import React, { FC, useMemo } from 'react';
import { StepProgress } from '@percona/platform-core';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddDBClusterModalProps, AddDBClusterFields } from './AddDBClusterModal.types';
import { DBClusterBasicOptions } from './DBClusterBasicOptions/DBClusterBasicOptions';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions';
import { INITIAL_VALUES } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.constants';
import { DBClusterTopology } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
import { DBClusterServiceFactory } from '../DBClusterService.factory';
import { styles } from './AddDBClusterModal.styles';

export const AddDBClusterModal: FC<AddDBClusterModalProps> = ({
  kubernetesOptions,
  isVisible,
  setVisible,
  onDBClusterAdded,
}) => {
  const steps = useMemo(
    () => [
      {
        title: Messages.dbcluster.addModal.steps.basicOptions,
        fields: [
          AddDBClusterFields.name,
          AddDBClusterFields.kubernetesCluster,
          AddDBClusterFields.databaseType,
        ],
        render: ({ form }) => <DBClusterBasicOptions kubernetesOptions={kubernetesOptions} form={form} />,
        dataQa: 'dbcluster-basic-options-step',
      },
      {
        title: Messages.dbcluster.addModal.steps.advancedOptions,
        fields: [
          AddDBClusterFields.topology,
          AddDBClusterFields.nodes,
          AddDBClusterFields.memory,
          AddDBClusterFields.cpu,
          AddDBClusterFields.disk,
        ],
        render: (renderProps) => <DBClusterAdvancedOptions {...renderProps} />,
        dataQa: 'dbcluster-advanced-options-step',
      },
    ],
    [kubernetesOptions],
  );
  const onSubmit = async ({
    name,
    kubernetesCluster,
    databaseType,
    topology,
    nodes,
    single,
    memory,
    cpu,
    disk,
  }: Record<string, any>) => {
    try {
      const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType.value);

      await dbClusterService.addDBCluster({
        kubernetesClusterName: kubernetesCluster.value,
        clusterName: name,
        databaseType: databaseType.value,
        clusterSize: topology === DBClusterTopology.cluster ? nodes : single,
        cpu,
        memory,
        disk,
      });
      setVisible(false);
      onDBClusterAdded();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal title={Messages.dbcluster.addModal.title} isVisible={isVisible} onClose={() => setVisible(false)}>
      <div className={styles.stepProgressWrapper}>
        <StepProgress steps={steps} initialValues={INITIAL_VALUES} onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

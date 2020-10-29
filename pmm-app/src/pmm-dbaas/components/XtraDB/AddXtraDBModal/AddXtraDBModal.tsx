import React, { FC, useMemo } from 'react';
import { StepProgress } from '@percona/platform-core';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { AddXtraDBModalProps, AddXtraDBFields } from './AddXtraDBModal.types';
import { XtraDBService } from '../XtraDB.service';
import { XtraDBClusterBasicOptions } from './XtraDBClusterBasicOptions/XtraDBClusterBasicOptions';
import { XtraDBAdvancedOptions } from './XtraDBAdvancedOptions/XtraDBAdvancedOptions';
import { INITIAL_VALUES } from './XtraDBAdvancedOptions/XtraDBAdvancedOptions.constants';
import { XtraDBTopology } from './XtraDBAdvancedOptions/XtraDBAdvancedOptions.types';

export const AddXtraDBModal: FC<AddXtraDBModalProps> = ({
  kubernetesOptions,
  isVisible,
  setVisible,
  onXtraDBAdded,
}) => {
  const steps = useMemo(() => [
    {
      title: Messages.xtradb.addModal.steps.basicOptions,
      fields: [
        AddXtraDBFields.name,
        AddXtraDBFields.kubernetesCluster,
        AddXtraDBFields.databaseType,
      ],
      render: () => (
        <XtraDBClusterBasicOptions kubernetesOptions={kubernetesOptions} />
      ),
      dataQa: 'xtradb-basic-options-step',
    },
    {
      title: Messages.xtradb.addModal.steps.advancedOptions,
      fields: [
        AddXtraDBFields.topology,
        AddXtraDBFields.nodes,
        AddXtraDBFields.memory,
        AddXtraDBFields.cpu,
      ],
      render: (renderProps) => (
        <XtraDBAdvancedOptions {...renderProps} />
      ),
      dataQa: 'xtradb-advanced-options-step',
    },
  ], [kubernetesOptions]);
  const onSubmit = async ({
    name,
    kubernetesCluster,
    databaseType,
    topology,
    nodes,
    single,
    memory,
    cpu,
  }: Record<string, any>) => {
    try {
      await XtraDBService.addXtraDBCluster({
        kubernetesClusterName: kubernetesCluster.value,
        clusterName: name,
        databaseType: databaseType.value,
        clusterSize: topology === XtraDBTopology.cluster ? nodes : single,
        cpu,
        memory,
      });
      setVisible(false);
      onXtraDBAdded();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={Messages.xtradb.addModal.title}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
    >
      <StepProgress
        steps={steps}
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

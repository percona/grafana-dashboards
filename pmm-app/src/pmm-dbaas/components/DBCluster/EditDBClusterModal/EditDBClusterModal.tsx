import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Form as FormFinal } from 'react-final-form';
import { EditDBClusterFields, EditDBClusterModalProps, SelectedDBCluster } from './EditDBClusterModal.types';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions';
import { DEFAULT_SIZES } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.constants';
import { DBClusterResources, DBClusterTopology } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
import { DBClusterServiceFactory } from '../DBClusterService.factory';

export const EditDBClusterModal: FC<EditDBClusterModalProps> = ({
  isVisible,
  setVisible,
  onDBClusterChanged,
  selectedCluster,
}) => {
  const onSubmit = async ({
    databaseType,
    topology,
    nodes,
    single,
    memory,
    cpu,
    disk,
  }: Record<string, any>) => {
    if (!selectedCluster) {
      setVisible(false);

      return;
    }

    try {
      const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType);

      await dbClusterService.updateDBCluster({
        databaseType,
        clusterName: selectedCluster.clusterName,
        kubernetesClusterName: selectedCluster.kubernetesClusterName,
        clusterSize: topology === DBClusterTopology.cluster ? nodes : single,
        cpu,
        memory,
        disk,
      });
      setVisible(false);
      onDBClusterChanged();
    } catch (e) {
      console.error(e);
    }
  };

  const [initialValues, setInitialValues] = useState({});
  const editModalTitle = `${selectedCluster?.clusterName} ( ${selectedCluster?.databaseType} )`;

  useEffect(() => {
    if (!selectedCluster) {
      setVisible(false);

      return;
    }

    const clusterParameters: SelectedDBCluster = { ...selectedCluster };

    // eslint-disable-next-line max-len
    clusterParameters.topology = clusterParameters.clusterSize > 1 ? DBClusterTopology.cluster : DBClusterTopology.single;
    clusterParameters[EditDBClusterFields.nodes] = clusterParameters.clusterSize;
    clusterParameters[EditDBClusterFields.single] = clusterParameters.clusterSize;

    const isMatchSize = (type) => DEFAULT_SIZES[type].cpu === clusterParameters.cpu
      && DEFAULT_SIZES[type].memory === clusterParameters.memory
      && DEFAULT_SIZES[type].disk === clusterParameters.disk;

    if (isMatchSize(DBClusterResources.small)) {
      clusterParameters.resources = DBClusterResources.small;
    } else if (isMatchSize(DBClusterResources.medium)) {
      clusterParameters.resources = DBClusterResources.medium;
    } else if (isMatchSize(DBClusterResources.large)) {
      clusterParameters.resources = DBClusterResources.large;
    } else {
      clusterParameters.resources = DBClusterResources.custom;
    }

    setInitialValues(clusterParameters);
  }, [selectedCluster]);

  return (
    <Modal title={editModalTitle} isVisible={isVisible} onClose={() => setVisible(false)}>
      <FormFinal
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
            <DBClusterAdvancedOptions
              {...renderProps}
            />
          </form>
        )}
      />
    </Modal>
  );
};

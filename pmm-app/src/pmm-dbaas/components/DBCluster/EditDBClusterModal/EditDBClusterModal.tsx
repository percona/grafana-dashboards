import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Form as FormFinal } from 'react-final-form';
import { EditDBClusterFields, EditDBClusterModalProps } from './EditDBClusterModal.types';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions';
import { DEFAULT_SIZES } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.constants';
import { DBClusterTopology } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
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
      const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType.value);

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

  useEffect(() => {
    if (!selectedCluster) {
      setVisible(false);

      return;
    }

    const clusterParameters: any = { ...selectedCluster };

    clusterParameters.databaseType = {
      value: clusterParameters.databaseType,
    };
    // eslint-disable-next-line max-len
    clusterParameters.topology = clusterParameters.clusterSize > 1 ? DBClusterTopology.cluster : DBClusterTopology.single;
    clusterParameters[EditDBClusterFields.nodes] = clusterParameters.clusterSize;
    clusterParameters[EditDBClusterFields.single] = clusterParameters.clusterSize;

    const isMatchSize = (type) => DEFAULT_SIZES[type].cpu === clusterParameters.cpu
      && DEFAULT_SIZES[type].memory === clusterParameters.memory
      && DEFAULT_SIZES[type].disk === clusterParameters.disk;

    if (isMatchSize('small')) {
      clusterParameters.resources = 'small';
    } else if (isMatchSize('medium')) {
      clusterParameters.resources = 'medium';
    } else if (isMatchSize('large')) {
      clusterParameters.resources = 'large';
    } else {
      clusterParameters.resources = 'custom';
    }

    setInitialValues(clusterParameters);
  }, [selectedCluster]);

  return (
    // eslint-disable-next-line max-len
    <Modal title={`${selectedCluster?.clusterName} ( ${selectedCluster?.databaseType} )`} isVisible={isVisible} onClose={() => setVisible(false)}>
      <FormFinal
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={() => undefined}
        render={(renderProps) => (
          <form onSubmit={renderProps.handleSubmit} className="discovery-instance-form app-theme-dark">
            <DBClusterAdvancedOptions
              {...renderProps}
            />
          </form>
        )}
      />
    </Modal>
  );
};

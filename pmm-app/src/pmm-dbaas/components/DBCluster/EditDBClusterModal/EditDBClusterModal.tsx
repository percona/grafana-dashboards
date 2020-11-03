import React, { FC, useMemo } from 'react';
import { StepProgress } from '@percona/platform-core';
import { Modal } from 'shared/components/Elements/Modal/Modal';
import { Messages } from 'pmm-dbaas/DBaaS.messages';
import { EditDBClusterModalProps, EditDBClusterFields } from './EditDBClusterModal.types';
import { DBClusterBasicOptions } from './DBClusterBasicOptions/DBClusterBasicOptions';
import { DBClusterAdvancedOptions } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions';
import { INITIAL_VALUES } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.constants';
import { DBClusterTopology } from './DBClusterAdvancedOptions/DBClusterAdvancedOptions.types';
import { DBClusterServiceFactory } from '../DBClusterService.factory';
import { styles } from './EditDBClusterModal.styles';
import { Form as FormFinal } from 'react-final-form';
import { CheckboxField, InputField, PasswordField, TextAreaField } from '../../../../shared/components/Form';

export const EditDBClusterModal: FC<EditDBClusterModalProps> = ({
  kubernetesOptions,
  isVisible,
  setVisible,
  onDBClusterAdded,
}) => {
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
      const dbClusterService = DBClusterServiceFactory.newDBClusterService(databaseType.value);

      await dbClusterService.addDBCluster({
        kubernetesClusterName: kubernetesCluster.value,
        clusterName: name,
        databaseType: databaseType.value,
        clusterSize: topology === DBClusterTopology.cluster ? nodes : single,
        cpu,
        memory,
      });
      setVisible(false);
      onDBClusterAdded();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal title={'Edit cluster'} isVisible={isVisible} onClose={() => setVisible(false)}>
      <div className={styles.stepProgressWrapper}>
        <FormFinal
          onSubmit={onSubmit}
          initialValues={INITIAL_VALUES}
          render={({ form, values, pristine, submitting, valid, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="add-instance-form app-theme-dark">
              <DBClusterAdvancedOptions
                form={form}
                values={values}
                pristine={pristine}
                submitting={submitting}
                valid={valid}
              />
            </form>
          )}
        />
      </div>
    </Modal>
  );
};

import React, { FC, useCallback, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { Button, useTheme } from '@grafana/ui';
import AddRemoteInstanceService, { toPayload } from './AddRemoteInstance.service';
import { getInstanceData } from './AddRemoteInstance.tools';
import { getStyles } from './AddRemoteInstance.styles';
import { AddRemoteInstanceProps } from './AddRemoteInstance.types';
import { AdditionalOptions, Labels, MainDetails } from './FormParts';

const AddRemoteInstance: FC<AddRemoteInstanceProps> = ({
  instance: { type, credentials },
  selectInstance,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { instanceType, remoteInstanceCredentials, discoverName } = getInstanceData(type, credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = { ...remoteInstanceCredentials };

  if (instanceType === 'MySQL') {
    initialValues.qan_mysql_perfschema = true;
  }

  const onSubmit = useCallback(
    async (values) => {
      const currentUrl = `${window.parent.location}`;
      const newURL = `${currentUrl.split('/graph/d/').shift()}/graph/d/pmm-inventory/`;

      const data = toPayload(values, discoverName);

      try {
        setLoading(true);

        if (values.isRDS) {
          await AddRemoteInstanceService.addRDS(data);
        } else {
          await AddRemoteInstanceService.addRemote(instanceType, data);
        }

        window.location.assign(newURL);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [instanceType],
  );

  return (
    <div className={styles.formWrapper}>
      <FormFinal
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} data-qa="add-remote-instance-form">
            <h4 className={styles.addRemoteInstanceTitle}>{`Add remote ${instanceType} Instance`}</h4>
            <MainDetails remoteInstanceCredentials={remoteInstanceCredentials} />
            <Labels />
            <AdditionalOptions
              remoteInstanceCredentials={remoteInstanceCredentials}
              loading={loading}
              instanceType={instanceType}
            />
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
              <Button id="addInstance" disabled={loading}>
                Add service
              </Button>
              <Button
                variant="secondary"
                id="addInstance"
                onClick={() => selectInstance({ type: '' })}
                disabled={loading}
                style={{ marginLeft: '20px' }}
              >
                Return to menu
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default AddRemoteInstance;

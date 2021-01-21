import React, { FC, useCallback, useMemo, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { Button, useTheme } from '@grafana/ui';
import { DATABASE_LABELS, Databases } from 'shared/core';
import AddRemoteInstanceService, { toPayload } from './AddRemoteInstance.service';
import { getInstanceData } from './AddRemoteInstance.tools';
import { getStyles } from './AddRemoteInstance.styles';
import { AddRemoteInstanceProps } from './AddRemoteInstance.types';
import { AdditionalOptions, Labels, MainDetails } from './FormParts';
import { Messages } from './AddRemoteInstance.messages';
import { ExternalExporterConnectionDetails } from './FormParts/ExternalExporterConnectionDetails/ExternalExporterConnectionDetails';

const AddRemoteInstance: FC<AddRemoteInstanceProps> = ({
  instance: { type, credentials },
  selectInstance,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { instanceType, remoteInstanceCredentials, discoverName } = getInstanceData(type, credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: any = { ...remoteInstanceCredentials, tracking: 'qan_postgresql_pgstatements_agent' };

  if (instanceType === DATABASE_LABELS[Databases.mysql]) {
    initialValues.qan_mysql_perfschema = true;
  }

  const onSubmit = useCallback(
    async (values) => {
      const data = toPayload(values, discoverName);

      try {
        setLoading(true);

        if (values.isRDS) {
          await AddRemoteInstanceService.addRDS(data);
        } else {
          await AddRemoteInstanceService.addRemote(instanceType, data);
        }

        window.location.href = '/graph/d/pmm-inventory/';
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [instanceType, type],
  );

  const formParts = useMemo(
    () => (form) => (
      <>
        {type !== 'external' ? (
          <MainDetails remoteInstanceCredentials={remoteInstanceCredentials} />
        ) : (
          <ExternalExporterConnectionDetails form={form} />
        )}
        <Labels />
        {type !== 'external' && (
          <AdditionalOptions
            remoteInstanceCredentials={remoteInstanceCredentials}
            loading={loading}
            instanceType={instanceType}
            form={form}
          />
        )}
      </>
    ),
    [type],
  );

  return (
    <div className={styles.formWrapper}>
      <FormFinal
        onSubmit={onSubmit}
        initialValues={initialValues}
        mutators={{
          // expect (field, value) args from the mutator
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
        }}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit} data-qa="add-remote-instance-form">
            <h4 className={styles.addRemoteInstanceTitle}>{`Add remote ${instanceType} Instance`}</h4>
            {formParts(form)}
            <div className={styles.addRemoteInstanceButtons}>
              <Button id="addInstance" disabled={loading}>
                {Messages.form.buttons.addService}
              </Button>
              <Button
                variant="secondary"
                onClick={() => selectInstance({ type: '' })}
                disabled={loading}
                className={styles.returnButton}
              >
                {Messages.form.buttons.toMenu}
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default AddRemoteInstance;

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
import { InstanceTypes } from '../../panel.types';

const AddRemoteInstance: FC<AddRemoteInstanceProps> = ({
  instance: { type, credentials },
  selectInstance,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { remoteInstanceCredentials, discoverName } = getInstanceData(type, credentials);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: any = { ...remoteInstanceCredentials, tracking: 'qan_postgresql_pgstatements_agent' };

  if (type === DATABASE_LABELS[Databases.mysql]) {
    initialValues.qan_mysql_perfschema = true;
  }

  const onSubmit = useCallback(
    async (values) => {
      try {
        setLoading(true);

        if (values.isRDS) {
          await AddRemoteInstanceService.addRDS(toPayload(values, discoverName));
        } else {
          await AddRemoteInstanceService.addRemote(type, values);
        }

        window.location.href = '/graph/d/pmm-inventory/';
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [type, discoverName],
  );

  const formParts = useMemo(
    () => (form) => (
      <>
        {type !== InstanceTypes.external ? (
          <MainDetails remoteInstanceCredentials={remoteInstanceCredentials} />
        ) : (
          <ExternalExporterConnectionDetails form={form} />
        )}
        <Labels />
        {type !== InstanceTypes.external && (
          <AdditionalOptions
            remoteInstanceCredentials={remoteInstanceCredentials}
            loading={loading}
            instanceType={type}
            form={form}
          />
        )}
      </>
    ),
    [type],
  );

  const getHeader = (databaseType) => {
    if (databaseType === InstanceTypes.external) {
      return 'Add external exporter';
    } else {
      return `Add remote ${DATABASE_LABELS[databaseType]} Instance`;
    }
  };

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
            <h4 className={styles.addRemoteInstanceTitle}>{getHeader(type)}</h4>
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

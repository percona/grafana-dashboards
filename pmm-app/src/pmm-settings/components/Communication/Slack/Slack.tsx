import { LinkTooltip } from '../../../../shared/components/Elements/LinkTooltip/LinkTooltip';
import { Field, Form } from 'react-final-form';
import { Button, Input, Spinner, useTheme } from '@grafana/ui';
import React from 'react';
import { getStyles } from '../../AlertManager/AlertManager.styles';
import { getSettingsStyles } from '../../../Settings.styles';

export const Slack = (props) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const loading = false;
  const action = 'Apply changes';

  return (
    <>
      <Form
        onSubmit={() => {}}
        initialValues={{ url: 'tester' }}
        render={({ form: { change }, values, handleSubmit, valid, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'URL'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <Button
              className={settingsStyles.actionButton}
              type="submit"
              disabled={pristine || loading}
              data-qa="alertmanager-button"
            >
              {loading && <Spinner />}
              {action}
            </Button>
          </form>
        )}
      />
    </>
  );
};

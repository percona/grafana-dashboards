import { LinkTooltip } from '../../../../shared/components/Elements/LinkTooltip/LinkTooltip';
import { Field, Form } from 'react-final-form';
import { Button, Input, Spinner, Tab, TabContent, TabsBar, useTheme } from '@grafana/ui';
import React from 'react';
import { getStyles } from '../../AlertManager/AlertManager.styles';
import { getSettingsStyles } from '../../../Settings.styles';
import {Messages} from "../Communication.messages";

export const Email = (props) => {
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
              <span>{Messages.fields.smarthost.label}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'From'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'Username'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'Password'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'Hello'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"
              // isEqual={isEqual}
              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'Identity'}</span>
              <LinkTooltip tooltipText={'test2'} link={'test3'} linkText={'test4'} icon="info-circle" />
            </div>
            <Field
              name="url"

              render={({ input }) => <Input {...input} className={styles.input} data-qa="alertmanager-url" />}
            />

            <div className={settingsStyles.labelWrapper} data-qa="alertmanager-url-label">
              <span>{'Secret'}</span>
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

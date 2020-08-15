import React, { FC, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { cx } from 'emotion';
import {
  Button, Spinner, useTheme
} from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { DATA_RETENTION_URL } from 'pmm-settings/Settings.constants';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { NumericInputField } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './Advanced.styles';
import { transformSecondsToDays } from './Advanced.utils';
import { SECONDS_IN_DAY, MIN_DAYS, MAX_DAYS } from './Advanced.constants';
import { AdvancedProps } from './Advanced.types';
import { SwitchRow } from './SwitchRow';

export const Advanced: FC<AdvancedProps> = ({
  dataRetention,
  telemetryEnabled,
  updatesDisabled,
  sttEnabled,
  updateSettings
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const {
    advanced: {
      action,
      retentionLabel,
      retentionTooltip,
      retentionUnits,
      telemetryLabel,
      telemetryLink,
      telemetryTooltip,
      updatesLabel,
      updatesLink,
      updatesTooltip,
      sttLabel,
      sttLink,
      sttTooltip
    }, tooltipLinkText
  } = Messages;
  const initialValues = {
    retention: transformSecondsToDays(dataRetention),
    telemetry: telemetryEnabled,
    updates: !updatesDisabled,
    stt: sttEnabled
  };
  const [loading, setLoading] = useState(false);
  const retentionValidators = validators.compose(
    validators.required,
    validators.range(MIN_DAYS, MAX_DAYS)
  );
  const applyChanges = ({ retention, telemetry, stt }) => {
    const body = {
      data_retention: `${+retention * SECONDS_IN_DAY}s`,
      disable_telemetry: !telemetry,
      enable_telemetry: telemetry,
      disable_stt: !stt,
      enable_stt: stt
    };

    updateSettings(body, setLoading);
  };

  return (
    <div className={styles.advancedWrapper}>
      <Form
        onSubmit={applyChanges}
        initialValues={initialValues}
        render={({
          values, handleSubmit, valid, pristine
        }) => (
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div
                      className={settingsStyles.labelWrapper}
                      data-qa="advanced-label"
                    >
                      <span>{retentionLabel}</span>
                      <LinkTooltip
                        tooltipText={retentionTooltip}
                        link={DATA_RETENTION_URL}
                        linkText={tooltipLinkText}
                        icon="info-circle"
                      />
                    </div>
                  </td>
                  <td className={styles.retentionInputWrapper}>
                    <Field
                      name="retention"
                      dataQa="advanced-retention-input"
                      component={NumericInputField}
                      validate={retentionValidators}
                    />
                    <span className={styles.retentionUnitslabel}>{retentionUnits}</span>
                  </td>
                </tr>
                <Field
                  name="telemetry"
                  type="checkbox"
                  label={telemetryLabel}
                  tooltip={telemetryTooltip}
                  tooltipLinkText={tooltipLinkText}
                  link={telemetryLink}
                  className={cx({ [styles.switchDisabled]: values.stt })}
                  disabled={values.stt}
                  dataQa="advanced-telemetry-switch"
                  component={SwitchRow}
                />
                <Field
                  name="updates"
                  type="checkbox"
                  label={updatesLabel}
                  tooltip={updatesTooltip}
                  tooltipLinkText={tooltipLinkText}
                  link={updatesLink}
                  className={styles.switchDisabled}
                  disabled
                  dataQa="advanced-updates-switch"
                  component={SwitchRow}
                />
                <Field
                  name="stt"
                  type="checkbox"
                  label={sttLabel}
                  tooltip={sttTooltip}
                  tooltipLinkText={tooltipLinkText}
                  link={sttLink}
                  className={cx({ [styles.switchDisabled]: !values.telemetry })}
                  disabled={!values.telemetry}
                  dataQa="advanced-stt-switch"
                  component={SwitchRow}
                />
              </tbody>
            </table>
            <Button
              className={settingsStyles.actionButton}
              type="submit"
              disabled={!valid || pristine || loading}
              data-qa="advanced-button"
            >
              {loading && <Spinner />}
              {action}
            </Button>
          </form>
        )}
      />
    </div>
  );
};

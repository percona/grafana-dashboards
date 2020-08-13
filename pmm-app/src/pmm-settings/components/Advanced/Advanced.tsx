import React, { FC, useState } from 'react';
import { cx } from 'emotion';
import {
  Button, Spinner, useTheme
} from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { DATA_RETENTION_URL } from 'pmm-settings/Settings.constants';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { NumericInput } from 'shared/components/Form';
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
  const initialRetentionDays = transformSecondsToDays(dataRetention);
  const [retentionDays, setRetentionDays] = useState(initialRetentionDays);
  const [telemetry, setTelemetry] = useState(telemetryEnabled);
  const [stt, setStt] = useState(sttEnabled);
  const [loading, setLoading] = useState(false);
  const isActionDisabled = () => (
    +retentionDays === initialRetentionDays
    && telemetry === telemetryEnabled
    && stt === sttEnabled
  );
  const stepUp = (max: number) => () => {
    if (retentionDays < max) {
      setRetentionDays(+retentionDays + 1);
    }
  };
  const stepDown = (min: number) => () => {
    if (retentionDays > min) {
      setRetentionDays(+retentionDays - 1);
    }
  };

  const applyChanges = () => {
    const body = {
      data_retention: `${+retentionDays * SECONDS_IN_DAY}s`,
      disable_telemetry: !telemetry,
      enable_telemetry: telemetry,
      disable_stt: !stt,
      enable_stt: stt
    };

    updateSettings(body, setLoading);
  };

  return (
    <div className={styles.advancedWrapper}>
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
              <NumericInput
                value={retentionDays}
                onChange={(e: any) => setRetentionDays(e.target.value)}
                data-qa="advanced-retention-input"
                stepUp={stepUp(MAX_DAYS)}
                stepDown={stepDown(MIN_DAYS)}
              />
              <span className={styles.retentionUnitslabel}>{retentionUnits}</span>
            </td>
          </tr>
          <SwitchRow
            label={telemetryLabel}
            tooltip={telemetryTooltip}
            tooltipLinkText={tooltipLinkText}
            link={telemetryLink}
            checked={telemetry}
            className={cx({ [styles.switchDisabled]: stt })}
            disabled={stt}
            onChange={() => setTelemetry(!telemetry)}
            dataQa="advanced-telemetry-switch"
          />
          <SwitchRow
            label={updatesLabel}
            tooltip={updatesTooltip}
            tooltipLinkText={tooltipLinkText}
            link={updatesLink}
            checked={!updatesDisabled}
            className={styles.switchDisabled}
            disabled
            dataQa="advanced-updates-switch"
          />
          <SwitchRow
            label={sttLabel}
            tooltip={sttTooltip}
            tooltipLinkText={tooltipLinkText}
            link={sttLink}
            checked={stt}
            className={cx({ [styles.switchDisabled]: !telemetry })}
            disabled={!telemetry}
            onChange={() => setStt(!stt)}
            dataQa="advanced-stt-switch"
          />
        </tbody>
      </table>
      <Button
        className={settingsStyles.actionButton}
        disabled={isActionDisabled() || loading}
        onClick={applyChanges}
        data-qa="advanced-button"
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};

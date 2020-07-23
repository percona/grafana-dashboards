import React, { FC, useState } from 'react';
import { cx } from 'emotion';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { GUI_DOC_URL, DATA_RETENTION_URL } from 'pmm-settings/Settings.constants';
import { LoadingCallback } from 'pmm-settings/Settings.service';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './Advanced.styles';
import { transformToDays } from './Advanced.utils';
import { SECONDS_IN_DAY } from './Advanced.constants';
import { SwitchRow } from './SwitchRow';

export interface AdvancedProps {
  dataRetention: string;
  telemetryEnabled: boolean;
  sttEnabled: boolean;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}

export const Advanced: FC<AdvancedProps> = ({
  dataRetention,
  telemetryEnabled,
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
      telemetryTooltip,
      updatesLabel,
      updatesTooltip,
      sttLabel,
      sttTooltip
    }, tooltipLinkText
  } = Messages;
  const initialRetentionDays = transformToDays(dataRetention);
  const [retentionDays, setRetentionDays] = useState(initialRetentionDays);
  const [telemetry, setTelemetry] = useState(telemetryEnabled);
  const [stt, setStt] = useState(sttEnabled);
  const [loading, setLoading] = useState(false);
  const disableAction = () => (
    +retentionDays === initialRetentionDays
    && telemetry === telemetryEnabled
    && stt === sttEnabled
  );

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
              <div className={settingsStyles.labelWrapper}>
                <span className={styles.label}>{retentionLabel}</span>
                <LinkTooltip
                  tooltipText={retentionTooltip}
                  link={DATA_RETENTION_URL}
                  linkText={tooltipLinkText}
                  icon="info-circle"
                />
              </div>
            </td>
            <td>
              <input
                type="number"
                className={styles.retentionInput}
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                data-qa="advanced-retention-input"
              />
              <span className={styles.retentionUnitslabel}>{retentionUnits}</span>
            </td>
          </tr>
          <SwitchRow
            label={telemetryLabel}
            tooltip={telemetryTooltip}
            tooltipLinkText={tooltipLinkText}
            link={`${GUI_DOC_URL}#server-admin-gui-telemetry`}
            checked={telemetry}
            className={cx({ [styles.switchDisabled]: stt })}
            onChange={() => setTelemetry(!telemetry)}
            dataQa="advanced-telemetry-switch"
          />
          <SwitchRow
            label={updatesLabel}
            tooltip={updatesTooltip}
            tooltipLinkText={tooltipLinkText}
            link={`${GUI_DOC_URL}#check-for-updates`}
            checked={false}
            className={styles.switchDisabled}
            dataQa="advanced-updates-switch"
          />
          <SwitchRow
            label={sttLabel}
            tooltip={sttTooltip}
            tooltipLinkText={tooltipLinkText}
            link={`${GUI_DOC_URL}#security-threat-tool`}
            checked={stt}
            className={cx({ [styles.switchDisabled]: !telemetry })}
            onChange={() => setStt(!stt)}
            dataQa="advanced-stt-switch"
          />
        </tbody>
      </table>
      <Button
        className={settingsStyles.actionButton}
        variant="secondary"
        disabled={disableAction() || loading}
        onClick={applyChanges}
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};

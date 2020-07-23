import React, { FC, useState, useEffect } from 'react';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { isEqual } from 'lodash';
import { RadioButtonGroup } from 'shared/components/Form/Radio/RadioButtonGroup';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { LoadingCallback } from 'pmm-settings/Settings.service';
import { MetricsResolutions } from 'pmm-settings/Settings.types';
import { GUI_DOC_URL } from 'pmm-settings/Settings.constants';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { resolutionsOptions, defaultResolutions } from './MetricsResolution.constants';
import { getStyles } from './MetricsResolution.styles';
import { getResolutionValue, removeUnits, addUnits } from './MetricsResolution.utils';

export interface MetricsResolutionProps {
  metricsResolutions: MetricsResolutions;
  updateSettings: (body: any, callback: LoadingCallback) => void;
}

export const MetricsResolution: FC<MetricsResolutionProps> = ({ metricsResolutions, updateSettings }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const initialResolutions = removeUnits(metricsResolutions);
  const [resolution, setResolution] = useState(getResolutionValue(metricsResolutions).key);
  const [updatedResolutions, updateResolutions] = useState(initialResolutions);
  const [loading, setLoading] = useState(false);
  const { metrics: { action, label, tooltip }, tooltipLinkText } = Messages;
  // eslint-disable-next-line max-len
  const onChangeInput = (key: string, value: string) => updateResolutions({ ...updatedResolutions, [key]: value });
  const applyChanges = () => {
    console.log('UPDATE SETTINGS');
    updateSettings({ metrics_resolutions: addUnits(updatedResolutions) }, setLoading);
  };

  useEffect(() => {
    if (resolution !== 'custom') {
      // eslint-disable-next-line max-len
      updateResolutions(removeUnits(defaultResolutions[resolutionsOptions.findIndex((r) => r.key === resolution)]));
    }
  }, [resolution]);


  return (
    <div className={styles.resolutionsWrapper}>
      <div className={settingsStyles.labelWrapper}>
        <span>{label}</span>
        <LinkTooltip
          tooltipText={tooltip}
          link={`${GUI_DOC_URL}#server-admin-gui-metrics-resolution`}
          linkText={tooltipLinkText}
          icon="info-circle"
        />
      </div>
      <RadioButtonGroup
        options={resolutionsOptions}
        selected={resolution}
        name="resolutions"
        dataQa="metrics-resolution-radio-button-group"
        className={styles.resolutionsRadioButtonGroup}
        onChange={(key) => setResolution(key)}
      />
      <input
        type="number"
        className={styles.resolutionInput}
        value={updatedResolutions.lr}
        disabled={resolution !== 'custom'}
        onChange={(e) => onChangeInput('lr', e.target.value)}
        data-qa="metrics-resolution-lr-input"
      />
      <input
        type="number"
        className={styles.resolutionInput}
        value={updatedResolutions.mr}
        disabled={resolution !== 'custom'}
        onChange={(e) => onChangeInput('mr', e.target.value)}
        data-qa="metrics-resolution-mr-input"
      />
      <input
        type="number"
        className={styles.resolutionInput}
        value={updatedResolutions.hr}
        disabled={resolution !== 'custom'}
        onChange={(e) => onChangeInput('hr', e.target.value)}
        data-qa="metrics-resolution-hr-input"
      />
      <Button
        className={settingsStyles.actionButton}
        variant="secondary"
        disabled={isEqual(initialResolutions, updatedResolutions) || loading}
        onClick={applyChanges}
        data-qa="metrics-resolution-button"
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};

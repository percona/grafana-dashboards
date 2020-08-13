import React, { FC, useState, useEffect } from 'react';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { isEqual } from 'lodash';
import { RadioButtonGroup } from 'shared/components/Form/Radio/RadioButtonGroup';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { MetricsResolutions } from 'pmm-settings/Settings.types';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { NumericInput } from 'shared/components/Form';
import {
  resolutionsOptions,
  defaultResolutions,
  resolutionMin,
  resolutionMax
} from './MetricsResolution.constants';
import { getStyles } from './MetricsResolution.styles';
import { getResolutionValue, removeUnits, addUnits } from './MetricsResolution.utils';
import { MetricsResolutionProps, MetricsResolutionPresets, MetricsResolutionIntervals } from './MetricsResolution.types';

export const MetricsResolution: FC<MetricsResolutionProps> = ({ metricsResolutions, updateSettings }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const settingsStyles = getSettingsStyles(theme);
  const initialResolutions: MetricsResolutions = removeUnits(metricsResolutions);
  const [resolution, setResolution] = useState(getResolutionValue(metricsResolutions).key);
  const [updatedResolutions, updateResolutions] = useState(initialResolutions);
  const [customResolutions, updateCustomResolutions] = useState(initialResolutions);
  const [loading, setLoading] = useState(false);
  const {
    metrics: {
      action,
      label,
      link,
      tooltip,
      intervals: {
        low,
        medium,
        high
      }
    },
    tooltipLinkText,
  } = Messages;
  const onChangeInput = (key: string, value: string) => {
    updateResolutions({ ...updatedResolutions, [key]: value });
    updateCustomResolutions({ ...customResolutions, [key]: value });
  };
  const applyChanges = () => {
    updateSettings({
      metrics_resolutions: resolution === MetricsResolutionPresets.custom
        ? addUnits(customResolutions)
        : addUnits(updatedResolutions)
    }, setLoading);
  };
  const stepUp = (key: string, max: number) => () => {
    const value = +customResolutions[key];

    if (value < max) {
      onChangeInput(key, `${value + 1}`);
    }
  };
  const stepDown = (key: string, min: number) => () => {
    const value = +customResolutions[key];

    if (value > min) {
      onChangeInput(key, `${value - 1}`);
    }
  };
  const isActionDisabled = () => (
    resolution === MetricsResolutionPresets.custom
      ? isEqual(initialResolutions, customResolutions)
      : isEqual(initialResolutions, updatedResolutions)
  );

  useEffect(() => {
    if (resolution !== MetricsResolutionPresets.custom) {
      updateResolutions(
        removeUnits(defaultResolutions[resolutionsOptions.findIndex((r) => r.key === resolution)])
      );
    }
  }, [resolution]);

  return (
    <div className={styles.resolutionsWrapper}>
      <div
        className={settingsStyles.labelWrapper}
        data-qa="metrics-resolution-label"
      >
        <span>{label}</span>
        <LinkTooltip
          tooltipText={tooltip}
          link={link}
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
      <NumericInput
        className={styles.resolutionInput}
        value={resolution === MetricsResolutionPresets.custom ? customResolutions.lr : updatedResolutions.lr}
        disabled={resolution !== MetricsResolutionPresets.custom}
        onChange={(e: any) => onChangeInput(MetricsResolutionIntervals.lr, e.target.value)}
        data-qa="metrics-resolution-lr-input"
        label={low}
        stepUp={stepUp(MetricsResolutionIntervals.lr, resolutionMax)}
        stepDown={stepDown(MetricsResolutionIntervals.lr, resolutionMin)}
      />
      <NumericInput
        className={styles.resolutionInput}
        value={resolution === MetricsResolutionPresets.custom ? customResolutions.mr : updatedResolutions.mr}
        disabled={resolution !== MetricsResolutionPresets.custom}
        onChange={(e: any) => onChangeInput(MetricsResolutionIntervals.mr, e.target.value)}
        data-qa="metrics-resolution-mr-input"
        label={medium}
        stepUp={stepUp(MetricsResolutionIntervals.mr, resolutionMax)}
        stepDown={stepDown(MetricsResolutionIntervals.mr, resolutionMin)}
      />
      <NumericInput
        className={styles.resolutionInput}
        value={resolution === MetricsResolutionPresets.custom ? customResolutions.hr : updatedResolutions.hr}
        disabled={resolution !== MetricsResolutionPresets.custom}
        onChange={(e: any) => onChangeInput(MetricsResolutionIntervals.hr, e.target.value)}
        data-qa="metrics-resolution-hr-input"
        label={high}
        stepUp={stepUp(MetricsResolutionIntervals.hr, resolutionMax)}
        stepDown={stepDown(MetricsResolutionIntervals.hr, resolutionMin)}
      />
      <Button
        className={settingsStyles.actionButton}
        disabled={isActionDisabled() || loading}
        onClick={applyChanges}
        data-qa="metrics-resolution-button"
      >
        {loading && <Spinner />}
        {action}
      </Button>
    </div>
  );
};

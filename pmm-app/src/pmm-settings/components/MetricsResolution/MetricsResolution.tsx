import React, { FC, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Button, Spinner, useTheme } from '@grafana/ui';
import { RadioButtonGroup } from 'shared/components/Form/Radio/RadioButtonGroup';
import { getSettingsStyles } from 'pmm-settings/Settings.styles';
import { Messages } from 'pmm-settings/Settings.messages';
import { MetricsResolutions } from 'pmm-settings/Settings.types';
import { LinkTooltip } from 'shared/components/Elements/LinkTooltip/LinkTooltip';
import { NumericInputField } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
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
  const changeResolutions = (state: any, changeValue: any, newResolutions: MetricsResolutions) => {
    Object.keys(newResolutions).forEach(
      (key) => changeValue(state, MetricsResolutionIntervals[key], () => newResolutions[key])
    );
  };
  const setNewResolutions = ([newResolution], state: any, { changeValue }) => {
    if (resolution === MetricsResolutionPresets.custom) {
      updateCustomResolutions(state.formState.values as MetricsResolutions);
    }

    if (newResolution !== MetricsResolutionPresets.custom) {
      const newResolutionKey = resolutionsOptions.findIndex((r) => r.key === newResolution);
      const resolutions = removeUnits(defaultResolutions[newResolutionKey]);

      changeResolutions(state, changeValue, resolutions);
    } else {
      changeResolutions(state, changeValue, customResolutions);
    }

    setResolution(newResolution);
  };
  const resolutionValidators = validators.compose(
    validators.required,
    validators.range(resolutionMin, resolutionMax)
  );
  const applyChanges = (values: MetricsResolutions) => {
    updateSettings({ metrics_resolutions: addUnits(values) }, setLoading);
  };

  return (
    <div className={styles.resolutionsWrapper}>
      <Form
        mutators={{ setNewResolutions }}
        onSubmit={applyChanges}
        initialValues={initialResolutions}
        render={({
          form, handleSubmit, valid, pristine
        }) => (
          <form onSubmit={handleSubmit}>
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
              onChange={form.mutators.setNewResolutions}
            />
            <Field
              name={MetricsResolutionIntervals.lr}
              label={low}
              className={styles.resolutionInput}
              disabled={resolution !== MetricsResolutionPresets.custom}
              dataQa="metrics-resolution-lr-input"
              component={NumericInputField}
              validate={resolutionValidators}
            />
            <Field
              name={MetricsResolutionIntervals.mr}
              label={medium}
              className={styles.resolutionInput}
              disabled={resolution !== MetricsResolutionPresets.custom}
              dataQa="metrics-resolution-mr-input"
              component={NumericInputField}
              validate={resolutionValidators}
            />
            <Field
              name={MetricsResolutionIntervals.hr}
              label={high}
              className={styles.resolutionInput}
              disabled={resolution !== MetricsResolutionPresets.custom}
              dataQa="metrics-resolution-hr-input"
              component={NumericInputField}
              validate={resolutionValidators}
            />
            <Button
              className={settingsStyles.actionButton}
              type="submit"
              disabled={!valid || pristine || loading}
              data-qa="metrics-resolution-button"
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

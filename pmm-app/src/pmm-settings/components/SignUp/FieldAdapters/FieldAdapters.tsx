import React from 'react';
import { cx } from 'emotion';
import {
  Input,
  useTheme,
} from '@grafana/ui';
import { getStyles } from './FieldAdapters.styles';
// TODO (nicolalamacchia): use Grafana's components once migration to Grafana v7 is complete
import { Checkbox } from './Checkbox';
import { Field } from './Field';

export const InputFieldAdapter = ({
  input, className, label, meta, ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Field label={label}>
      <>
        <Input
          {...input}
          {...props}
          className={cx(className, { invalid: meta.touched && meta.error })}
          title={meta.touched ? meta.error : ''}
        />
        <div data-qa="input-field-error-message" className={styles.errorMessage}>{meta.touched && meta.error}</div>
      </>
    </Field>
  );
};

export const CheckboxFieldAdapter = ({
  input, className, meta, ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Field>
      <div className={cx(className, { invalid: meta.touched && meta.error })}>
        <Checkbox {...input} {...props} />
        <div data-qa="checkbox-field-error-message" className={styles.errorMessage}>{meta.touched && meta.error}</div>
      </div>
    </Field>
  );
};

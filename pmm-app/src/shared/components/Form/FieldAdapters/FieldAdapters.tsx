import React from 'react';
import { cx } from 'emotion';
import {
  Input, Select, TextArea, useTheme
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


export const TextAreaAdapter = ({
  input, className, label, meta, ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Field label={label}>
      <>
        <TextArea
          {...input}
          {...props}
          rows={8}
          title={meta.touched ? meta.error : ''}
          className={cx(className, { invalid: meta.touched && meta.error })}
        />
        <div data-qa="textarea-field-error-message" className={styles.errorMessage}>{meta.touched && meta.error}</div>
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

export const SelectFieldAdapter = ({
  input, className, options, label, meta, dataQa, ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Field label={label}>
      <div data-qa={dataQa}>
        <Select
          {...input}
          {...props}
          options={options}
          className={cx(className, styles.input)}
          invalid={meta.touched && meta.error}
        />
        <div data-qa="select-field-error-message" className={styles.errorMessage}>{meta.touched && meta.error}</div>
      </div>
    </Field>
  );
};

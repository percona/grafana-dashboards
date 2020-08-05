import React, {
  FC,
} from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import {
  Button,
  LinkButton,
  Input,
  useTheme,
} from '@grafana/ui';
import * as GrafanaUI from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './SignUp.styles';
import { Messages } from './SignUp.messages';

const { Field, Checkbox } = (GrafanaUI as any).Forms;

const required = (value: string | boolean | undefined) => (value ? undefined : 'Required');
const validEmail = (value: string) => {
  const emailRe = RegExp(''
    + '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]'
    + '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?'
    + '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

  return emailRe.test(value) ? undefined : 'Invalid email address';
};
const composeValidators = (...validators: Array<(value: any) => any>) => (value: any) => validators.reduce(
  (error, validator) => error || validator(value), undefined
);

const InputFieldAdapter = ({
  input, className, label, meta, ...props
}) => (
  <Field label={label}>
    <>
      <Input
        {...input}
        {...props}
        className={cx(className, { invalid: meta.touched && meta.error })}
        title={meta.touched ? meta.error : ''}
      />
    </>
  </Field>
);

const CheckboxFieldAdapter = ({
  input, className, meta, ...props
}) => (
  <Field>
    <div className={cx(className, { invalid: meta.touched && meta.error })}>
      <Checkbox {...input} {...props} />
    </div>
  </Field>
);

export const SignUp: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const checkboxLabel = (
    <span className={styles.checkboxLabel}>
      {Messages.agreementFirstPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href="#">{Messages.termsOfService}</LinkButton>
      ,
      {' '}
      <LinkButton className={styles.link} variant="link" href="#">{Messages.privacyPolicy}</LinkButton>
      ,
      {' '}
      {Messages.agreementSecondPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href="#">{Messages.notificationSettings}</LinkButton>
    </span>
  );

  return (
    <div className={styles.formWrapper}>
      <FinalForm
        onSubmit={() => {}}
        render={({
          pristine, submitting, valid, handleSubmit
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <legend className={styles.legend}>
              {Messages.signUp}
            </legend>
            <FinalField name="email" label="Email" component={InputFieldAdapter} validate={composeValidators(required, validEmail)} />
            <FinalField name="new-password" label="Password" type="password" component={InputFieldAdapter} validate={required} autocomplete="on" />
            <FinalField className={styles.checkboxWrapper} label={checkboxLabel} name="agreement" component={CheckboxFieldAdapter} validate={required} type="checkbox" />
            <Button className={styles.submitButton} type="submit" disabled={!valid || submitting || pristine}>{Messages.signUp}</Button>
            <Button onClick={() => {}} className={styles.signInButton} type="button" variant="destructive">{Messages.signIn}</Button>
          </form>
        )}
      />
    </div>
  );
};

import React, {
  FC,
} from 'react';
import { Form as FinalForm, Field as FinalField } from 'react-final-form';
import {
  Button,
  LinkButton,
  useTheme,
} from '@grafana/ui';
import { getStyles } from './SignUp.styles';
import { Messages } from './SignUp.messages';
import { InputFieldAdapter, CheckboxFieldAdapter } from './FieldAdapters';
import { TERMS_OF_SERVICE_URL, PRIVACY_POLICY_URL, NOTIFICATION_SETTINGS_URL } from './SignUp.constants';

const required = (value: string | boolean | undefined) => (value ? undefined : Messages.errors.requiredField);
const validEmail = (value: string) => {
  const emailRe = RegExp(''
    + '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]'
    + '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?'
    + '(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

  return emailRe.test(value) ? undefined : Messages.errors.invalidEmail;
};
const composeValidators = (...validators: Array<(value: any) => any>) => (value: any) => validators.reduce(
  (error, validator) => error || validator(value), undefined
);

export const SignUp: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const checkboxLabel = (
    <span className={styles.checkboxLabel}>
      {Messages.agreementFirstPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>{Messages.termsOfService}</LinkButton>
      ,
      {' '}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>{Messages.privacyPolicy}</LinkButton>
      ,
      {' '}
      {Messages.agreementSecondPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={NOTIFICATION_SETTINGS_URL}>{Messages.notificationSettings}</LinkButton>
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

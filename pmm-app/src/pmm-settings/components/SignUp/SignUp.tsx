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
import { required, validEmail, composeValidators } from './SignUp.validators';

export const SignUp: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const checkboxLabel = (
    <span data-qa="sign-up-agreement-checkbox-label" className={styles.checkboxLabel}>
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
    <div data-qa="sign-up-form-wrapper" className={styles.formWrapper}>
      <FinalForm
        onSubmit={() => {}}
        render={({
          pristine, submitting, valid, handleSubmit
        }) => (
          <form data-qa="sign-up-form" className={styles.form} onSubmit={handleSubmit}>
            <legend className={styles.legend}>
              {Messages.signUp}
            </legend>
            <FinalField
              data-qa="sign-up-email-input"
              name="email"
              label="Email"
              component={InputFieldAdapter}
              validate={composeValidators(required, validEmail)}
            />
            <FinalField
              data-qa="sign-up-password-input"
              name="new-password"
              label="Password"
              type="password"
              component={InputFieldAdapter}
              validate={required}
              autoComplete="on"
            />
            <FinalField
              data-qa="sign-up-agreement-checkbox"
              className={styles.checkboxWrapper}
              label={checkboxLabel}
              name="agreement"
              component={CheckboxFieldAdapter}
              validate={required}
              type="checkbox"
            />
            <Button
              data-qa="sign-up-submit-button"
              className={styles.submitButton}
              type="submit"
              disabled={!valid || submitting || pristine}
            >
              {Messages.signUp}
            </Button>
            <Button
              data-qa="sign-up-to-sign-in-button"
              onClick={() => {}}
              className={styles.signInButton}
              type="button"
              variant="destructive"
            >
              {Messages.signIn}

            </Button>
          </form>
        )}
      />
    </div>
  );
};

import React, { FC, useState } from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { Button, LinkButton, useTheme } from '@grafana/ui';
import { showSuccessNotification, showErrorNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './SignUp.styles';
import { Messages } from './SignUp.messages';
import { InputFieldAdapter, CheckboxFieldAdapter } from './FieldAdapters/FieldAdapters';
import { TERMS_OF_SERVICE_URL, PRIVACY_POLICY_URL, NOTIFICATION_SETTINGS_URL } from './SignUp.constants';
import { SignUpData, SignUpProps } from './types';
import { LoggedIn } from './LoggedIn/LoggedIn';

const signUp = async (signUpData: SignUpData) => {
  // XXX: stub for the actual sign up API call
  signUpData;
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

export const SignUp: FC<SignUpProps> = ({ userEmail }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loggedInEmail, setLoggedInEmail] = useState(userEmail);

  const CheckboxLabel = () => (
    <span data-qa="sign-up-agreement-checkbox-label" className={styles.checkboxLabel}>
      {Messages.agreementFirstPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>
        {Messages.termsOfService}
      </LinkButton>
      {', '}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>
        {Messages.privacyPolicy}
      </LinkButton>
      {', '}
      {Messages.agreementSecondPart}
      {' '}
      <LinkButton className={styles.link} variant="link" href={NOTIFICATION_SETTINGS_URL}>
        {Messages.notificationSettings}
      </LinkButton>
    </span>
  );

  const handleSignUpFormSubmit = async (signUpData: SignUpData) => {
    try {
      await signUp(signUpData);
      setLoggedInEmail(signUpData.email);
      showSuccessNotification({ message: Messages.signUpSucceeded });
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const InnerForm: FC<FormRenderProps<SignUpData>> = ({
    pristine, submitting, valid, handleSubmit
  }) => (
    <form data-qa="sign-up-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>{Messages.signUp}</legend>
      <Field
        data-qa="sign-up-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(validators.required, validators.validateEmail)}
      />
      <Field
        data-qa="sign-up-password-input"
        name="newPassword"
        label={Messages.passwordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.required}
        autoComplete="on"
      />
      <Field
        data-qa="sign-up-agreement-checkbox"
        className={styles.checkboxWrapper}
        label={<CheckboxLabel />}
        name="agreement"
        component={CheckboxFieldAdapter}
        validate={validators.requiredTrue}
        type="checkbox"
      />
      <ButtonWithSpinner
        data-qa="sign-up-submit-button"
        className={styles.submitButton}
        type="submit"
        disabled={!valid || submitting || pristine}
        isLoading={submitting}
      >
        {Messages.signUp}
      </ButtonWithSpinner>
      <Button
        data-qa="sign-up-to-sign-in-button"
        className={styles.signInButton}
        type="button"
        variant="secondary"
        disabled
      >
        {Messages.signIn}
      </Button>
    </form>
  );

  return (
    // TODO (nicolalamacchia): improve this once the sign in component is ready
    <>
      {loggedInEmail != null ? (
        <LoggedIn email={loggedInEmail} />
      ) : (
        <div data-qa="sign-up-form-wrapper" className={styles.formWrapper}>
          <Form onSubmit={handleSignUpFormSubmit} render={InnerForm} />
        </div>
      )}
    </>
  );
};

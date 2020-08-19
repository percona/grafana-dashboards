import React, { FC, useState } from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { Button, LinkButton, useTheme } from '@grafana/ui';
import { showSuccessNotification, showErrorNotification } from 'shared/components/helpers';
import { ButtonWithSpinner } from 'shared/components/Form';
import validators from 'shared/components/helpers/validators';
import { getStyles } from './PlatformLogin.styles';
import { Messages } from './PlatformLogin.messages';
import { InputFieldAdapter, CheckboxFieldAdapter } from './FieldAdapters/FieldAdapters';
import { TERMS_OF_SERVICE_URL, PRIVACY_POLICY_URL, NOTIFICATION_SETTINGS_URL } from './PlatformLogin.constants';
import { Credentials, SignUpProps } from './types';
import { LoggedIn } from './LoggedIn/LoggedIn';
import { PlatformLoginService } from './PlatformLogin.service';

export const PlatformLogin: FC<SignUpProps> = ({ userEmail }) => {
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

  const handleSignUpFormSubmit = async (credentials: Credentials) => {
    console.log(credentials)
    try {
      const result = await PlatformLoginService.signUp(credentials);

      if (result.email) {
        setLoggedInEmail(result.email);
        showSuccessNotification({ message: Messages.signUpSucceeded });
        showSuccessNotification({ message: `${Messages.loginSucceeded} ${result.email}` });
      }
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const handleSignInFormSubmit = async (credentials: Credentials) => {
    try {
      const result = await PlatformLoginService.signIn(credentials);

      if (result.email) {
        setLoggedInEmail(result.email);
        showSuccessNotification({ message: Messages.signUpSucceeded });
        showSuccessNotification({ message: `${Messages.loginSucceeded} ${result.email}` });
      }
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const InnerForm: FC<FormRenderProps<Credentials>> = ({
    pristine, submitting, valid, handleSubmit, form
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
        name="password"
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
        type="button"
        disabled={!valid || submitting || pristine}
        isLoading={submitting}
        onClick={() => {
          form.change('type', 'signUp');
          form.submit();
        }}
      >
        {Messages.perconaPlatform}
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

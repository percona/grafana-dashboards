import React, { FC } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { LinkButton, useTheme } from '@grafana/ui';
import validators from 'shared/components/helpers/validators';
import { ButtonWithSpinner } from 'shared/components/Form';
import { showErrorNotification, showSuccessNotification } from 'shared/components/helpers';
import { Credentials, LoginFormProps } from './types';
import { Messages } from './PlatformLogin.messages';
import { CheckboxFieldAdapter, InputFieldAdapter } from './FieldAdapters/FieldAdapters';
import { getStyles } from './PlatformLogin.styles';
import { PlatformLoginService } from './PlatformLogin.service';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from './PlatformLogin.constants';

export const SignUp = ({ changeMode, getSettings }: LoginFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleSignUpFormSubmit = async (credentials: Credentials) => {
    try {
      await PlatformLoginService.signUp(credentials);

      getSettings();
      showSuccessNotification({ message: Messages.signUpSucceeded });
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const CheckboxLabel = () => (
    <span data-qa="sign-up-agreement-checkbox-label" className={styles.checkboxLabel}>
      {`${Messages.agreementFirstPart} `}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>
        {Messages.termsOfService}
      </LinkButton>
      {` ${Messages.agreementSecondPart} `}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>
        {Messages.privacyPolicy}
      </LinkButton>
    </span>
  );

  const SignUpForm: FC<FormRenderProps<Credentials>> = ({
    pristine,
    submitting,
    valid,
    handleSubmit,
    form,
  }) => (
    <form data-qa="sign-up-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>{Messages.perconaPlatform}</legend>
      <Field
        data-qa="sign-up-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(
          validators.required,
          validators.validateEmail,
        )}
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
        data-qa="sign-up-password-input"
        name="confirm-password"
        label={Messages.confirmPasswordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.matches('password', Messages.errors.passwordMismatch)}
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
        {Messages.perconaPlatform}
      </ButtonWithSpinner>
      <ButtonWithSpinner
        data-qa="sign-up-to-sign-in-button"
        className={styles.signInButton}
        type="button"
        variant="link"
        onClick={changeMode}
        disabled={submitting}
      >
        Back to login
      </ButtonWithSpinner>
    </form>
  );

  return <Form onSubmit={handleSignUpFormSubmit} render={SignUpForm} />;
};

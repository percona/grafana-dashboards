import React, { FC } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { Button, useTheme } from '@grafana/ui';
import validators from 'shared/components/helpers/validators';
import { ButtonWithSpinner } from 'shared/components/Form';
import { showErrorNotification, showSuccessNotification } from 'shared/components/helpers';
import { Credentials, LoginFormProps } from './types';
import { Messages } from './PlatformLogin.messages';
import { InputFieldAdapter } from './FieldAdapters/FieldAdapters';
import { getStyles } from './PlatformLogin.styles';
import { PlatformLoginService } from './PlatformLogin.service';


export const SignIn = ({ changeMode, getSettings }: LoginFormProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleSignInFormSubmit = async (credentials: Credentials) => {
    try {
      await PlatformLoginService.signIn(credentials);

      getSettings();
      showSuccessNotification({ message: `${Messages.loginSucceeded} ${credentials.email}` });
    } catch (e) {
      console.error(e);
      showErrorNotification({ message: Messages.errors.signUpFailed });
    }
  };

  const SignInForm: FC<FormRenderProps<Credentials>> = ({
    pristine,
    submitting,
    valid,
    handleSubmit,
    form,
  }) => (
    <form data-qa="sign-in-form" className={styles.form} onSubmit={handleSubmit}>
      <legend className={styles.legend}>{Messages.signIn}</legend>
      <Field
        data-qa="sign-in-email-input"
        name="email"
        label={Messages.emailLabel}
        component={InputFieldAdapter}
        validate={validators.compose(
          validators.required,
          validators.validateEmail,
        )}
      />
      <Field
        data-qa="sign-in-password-input"
        name="password"
        label={Messages.passwordLabel}
        type="password"
        component={InputFieldAdapter}
        validate={validators.required}
        autoComplete="on"
      />
      <Button
        data-qa="sign-in-submit-button"
        className={styles.signInButton}
        type="submit"
        disabled={!valid || submitting || pristine}
      >
        {Messages.signIn}
      </Button>
      <ButtonWithSpinner
        data-qa="sign-in-to-sign-up-button"
        className={styles.submitButton}
        type="button"
        onClick={changeMode}
        disabled={submitting}
        variant="link"
      >
        {Messages.perconaPlatform}
      </ButtonWithSpinner>
    </form>
  );

  return <Form onSubmit={handleSignInFormSubmit} render={SignInForm} />;
};

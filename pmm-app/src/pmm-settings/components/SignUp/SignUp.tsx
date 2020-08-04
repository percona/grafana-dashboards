import React, {
  FC,
} from 'react';
import { Form as FinalForm } from 'react-final-form';
import {
  Button,
  LinkButton,
  Input,
  useTheme,
} from '@grafana/ui';
import * as GrafanaUI from '@grafana/ui';
import { getStyles } from './SignUp.styles';
import { Messages } from './SignUp.messages';

export const SignUp: FC = () => {
  const { Field, Checkbox } = (GrafanaUI as any).Forms;
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
      <LinkButton className={styles.link} variant="link" href="#test">{Messages.notificationSettings}</LinkButton>
    </span>
  );

  return (
    <div className={styles.formWrapper}>
      <FinalForm
        onSubmit={() => {}}
        render={({ pristine, submitting, handleSubmit }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <legend className={styles.legend}>
              {Messages.signUp}
            </legend>
            <Field label="Email">
              <Input type="email" />
            </Field>
            <Field label="Password">
              <Input type="password" />
            </Field>
            <Field>
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  label={checkboxLabel}
                />
              </div>
            </Field>
            <Button type="submit" disabled={submitting || pristine}>{Messages.signUp}</Button>
          </form>
        )}
      />
    </div>
  );
};

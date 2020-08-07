import React, { FC } from 'react';
import {
  LinkButton,
  useTheme,
} from '@grafana/ui';
import { Messages } from './LoggedIn.messages';
import { getStyles } from './LoggedIn.styles';
import { SIGN_OUT_URL } from './LoggedIn.constants';

interface LoggedInProps {
  email: string;
}

export const LoggedIn: FC<LoggedInProps> = ({ email }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <section data-qa="logged-in-wrapper" className={styles.wrapper}>
      <header className={styles.title}>{Messages.title}</header>
      <p>{Messages.info}</p>
      <p className={styles.email}><u data-qa="logged-in-email">{email}</u></p>
      <LinkButton data-qa="logged-in-sign-out-link" variant="link" href={SIGN_OUT_URL}>{Messages.signOut}</LinkButton>
    </section>
  );
};

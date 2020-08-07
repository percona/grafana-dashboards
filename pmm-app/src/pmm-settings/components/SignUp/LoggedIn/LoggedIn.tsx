import React, { FC } from 'react';
import {
  LinkButton,
  useTheme,
} from '@grafana/ui';
import { Messages } from './LoggedIn.messages';
import { getStyles } from './LoggedIn.styles';


interface LoggedInProps {
  email: string;
}

export const LoggedIn: FC<LoggedInProps> = ({ email }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <section className={styles.wrapper}>
      <header className={styles.title}>{Messages.title}</header>
      <p>{Messages.info}</p>
      <p className={styles.email}><u>{email}</u></p>
      <LinkButton variant="link">{Messages.signOut}</LinkButton>
    </section>
  );
};

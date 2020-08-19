import React, { FC, useState } from 'react';
import { useTheme } from '@grafana/ui';
import { getStyles } from './PlatformLogin.styles';
import { SignUpProps } from './types';
import { LoggedIn } from './LoggedIn/LoggedIn';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const PlatformLogin: FC<SignUpProps> = ({ userEmail }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [loggedInEmail, setLoggedInEmail] = useState(userEmail);
  const [isSignInMode, setMode] = useState(true);
  const toggleMode = () => setMode(!isSignInMode);

  return (
    <>
      {loggedInEmail != null ? (
        <LoggedIn email={loggedInEmail} />
      ) : (
        <div data-qa="sign-up-form-wrapper" className={styles.formWrapper}>
          {isSignInMode
            ? <SignIn setLoggedInEmail={setLoggedInEmail} changeMode={toggleMode} />
            : <SignUp setLoggedInEmail={setLoggedInEmail} changeMode={toggleMode} />}
        </div>
      )}
    </>
  );
};

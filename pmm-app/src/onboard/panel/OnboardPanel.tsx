import React, {
  useState, FC,
} from 'react';
import { NavBar } from '../components';
import { IntroContainer } from '../components/IntroContainer/IntroContainer';

export const OnboardPanel: FC<{}> = () => {
  const [message, setMessage] = useState('');

  return (
    <>
      <NavBar
        title="Percona monitoring and management"
        showSignInButton
        showFeedbackButton
        showHelpCenterButton
        showHelpCenterNotificationMarker
        onSignInClick={() => setMessage('sign in')}
        onHelpCenterClick={() => setMessage('help center')}
        onNotificationClick={() => setMessage('notification')}
        onFeedbackClick={() => setMessage('feedback form')}
      />
      <br />
      <div>{message}</div>
      <IntroContainer />
    </>
  );
};

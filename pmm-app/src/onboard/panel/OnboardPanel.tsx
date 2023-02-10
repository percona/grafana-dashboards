import React, {
  useState, FC,
} from 'react';
import { HelpCenter, NavBar } from '../components';

export const OnboardPanel: FC<{}> = () => {
  const [message, setMessage] = useState('');
  const [userContext, setUserContext] = useState('');
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);

  return (
    <>
      <NavBar
        title="Percona monitoring and management"
        userContext={userContext}
        showSignIn
        showFeedbackButton
        showHelpCenterButton
        showHelpCenterNotificationMarker
        onSignInClick={() => {
          setMessage('sign in');
          setUserContext('something_here');
        }}
        onHelpCenterClick={() => setIsHelpCenterOpen(!isHelpCenterOpen)}
        onNotificationClick={() => setMessage('notification')}
        onFeedbackClick={() => setMessage('feedback form')}
      />
      <div>{message}</div>
      <HelpCenter open={isHelpCenterOpen} onClose={() => setIsHelpCenterOpen(false)} />
    </>
  );
};

import React, {
  useState, FC,
} from 'react';
import { NavBar } from '../components';

export const OnboardPanel: FC<{}> = () => {
  const [message, setMessage] = useState('');

  return (
    <>
      <NavBar
        onSignInClick={() => setMessage('sign in')}
        onHelpCenterClick={() => setMessage('help center')}
        onNotificationClick={() => setMessage('notification')}
        onFeedbackClick={() => setMessage('feedback form')}
        showNotificationMarker
        showHelpCenterNotificationMarker
      />
      <br />
      <div>{message}</div>
    </>
  );
};

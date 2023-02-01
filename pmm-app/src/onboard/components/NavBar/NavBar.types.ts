import { ReactNode } from 'react';

export interface NavBarTypes {
  title: string;
  showSignInButton?: boolean;
  showFeedbackButton?: boolean;
  showHelpCenterButton?: boolean;

  onSignInClick: () => void;
  onFeedbackClick: () => void;
  onNotificationClick: () => void;
  onHelpCenterClick: () => void;
  showHelpCenterNotificationMarker?: boolean;
  children?: ReactNode;
}

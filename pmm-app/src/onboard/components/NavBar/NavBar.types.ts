import { ReactNode } from 'react';

export interface NavBarTypes {
  title: string;
  showSignIn?: boolean;
  showFeedbackButton?: boolean;
  showHelpCenterButton?: boolean;
  userContext?: any;

  onSignInClick: () => void;
  onFeedbackClick: () => void;
  onNotificationClick: () => void;
  onHelpCenterClick: () => void;
  showHelpCenterNotificationMarker?: boolean;
  children?: ReactNode;
}

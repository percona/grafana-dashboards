import { ReactNode } from 'react';

export interface NavBarTypes {
  onSignInClick: () => void;
  onFeedbackClick: () => void;
  onNotificationClick: () => void;
  onHelpCenterClick: () => void;
  showNotificationMarker?: boolean;
  showHelpCenterNotificationMarker?: boolean;
  children?: ReactNode;
}

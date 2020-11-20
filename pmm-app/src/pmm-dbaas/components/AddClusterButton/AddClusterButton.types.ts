import { ReactNode } from 'react';

export interface AddClusterButtonProps {
  label: string;
  disabled?: boolean;
  showWarning?: boolean;
  warningMessage?: string | ReactNode;
  action: () => void;
}

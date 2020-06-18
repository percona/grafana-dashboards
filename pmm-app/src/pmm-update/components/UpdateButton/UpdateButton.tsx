import React from 'react';

import { CenteredButton } from 'pmm-update/components';
import * as styles from './UpdateButton.styles';

interface UpdateButtonProps {
  onClick: () => void;
  nextVersion: string;
  disabled?: boolean;
}

export const UpdateButton = ({ onClick, nextVersion, disabled = false }: UpdateButtonProps) => (
  <CenteredButton disabled={disabled} className={styles.updateButton} onClick={onClick} icon="fa fa-download">
    Update to {nextVersion}
  </CenteredButton>
);

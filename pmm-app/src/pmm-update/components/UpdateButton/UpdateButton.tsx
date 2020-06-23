import React from 'react';

import { CenteredButton } from 'pmm-update/components';
import { UpdateButtonProps } from 'pmm-update/types';
import * as styles from './UpdateButton.styles';

export const UpdateButton = ({ onClick, nextVersion, disabled = false }: UpdateButtonProps) => (
  <CenteredButton disabled={disabled} className={styles.updateButton} onClick={onClick} icon="fa fa-download">
    Update to {nextVersion}
  </CenteredButton>
);

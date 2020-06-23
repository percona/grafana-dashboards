import React, { FC } from 'react';

import { CenteredButton } from 'pmm-update/components';
import { UpdateButtonProps } from 'pmm-update/types';
import * as styles from './UpdateButton.styles';

export const UpdateButton: FC<UpdateButtonProps> = ({ onClick, nextVersion, disabled = false }) => (
  <CenteredButton disabled={disabled} className={styles.updateButton} onClick={onClick} icon="fa fa-download">
    Update to {nextVersion}
  </CenteredButton>
);

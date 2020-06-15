import React from 'react';
import { Button, Icon } from '@grafana/ui';

import * as styles from './UpdateButton.styles';

interface UpdateButtonProps {
  onClick: () => void;
  nextVersion: string;
  disabled?: boolean;
}

export const UpdateButton = ({ onClick, nextVersion, disabled = false }: UpdateButtonProps) => (
  // TODO (nicolalamacchia): replace the icon with the `icon` prop of `Button` (it currently doen not work)
  <Button disabled={disabled} className={styles.updateButton} onClick={onClick}>
    <Icon name="download" /> Update to {nextVersion}
  </Button>
);

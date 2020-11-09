import React, { FC } from 'react';
import { Button, Icon, useStyles } from '@grafana/ui';
import { AddClusterButtonProps } from './AddClusterButton.types';
import { getStyles } from './AddClusterButton.styles';

export const AddClusterButton: FC<AddClusterButtonProps> = ({
  label,
  disabled,
  showWarning,
  warningMessage,
  action,
  ...props
}) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.addClusterButtonWrapper}>
      <Button
        size="md"
        onClick={action}
        icon="plus-square"
        variant="link"
        disabled={disabled}
        {...props}
      >
        {label}
      </Button>
      {showWarning && (
        <div
          className={styles.warningWrapper}
          data-qa="add-cluster-button-warning"
        >
          <Icon name="info-circle" />
          <span className={styles.warningMessage}>
            {warningMessage}
          </span>
        </div>
      )}
    </div>
  );
};

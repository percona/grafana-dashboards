import React from 'react';

import * as styles from './UpdateButton.styles';

interface UpdateButtonProps {
  onClick: () => void;
  nextVersion: string;
  disabled?: boolean;
}

export const UpdateButton = ({ onClick, nextVersion, disabled = false }: UpdateButtonProps) => (
  <button
    className={`btn btn-secondary btn-block ${styles.updateButton}`}
    disabled={disabled}
    onClick={onClick}
  >
    <span>
      <i className="fa fa-download"></i> Update to {nextVersion}
    </span>
  </button>
);

import React, { FC, useEffect, ReactNode } from 'react';

import { IconButton, useTheme } from '@grafana/ui';
import { getStyles } from './Modal.styles';

interface ModalWindow {
  onClose: () => void;
  closeOnClickaway?: boolean;
  closeOnEscape?: boolean;
  isVisible: boolean;
  title: ReactNode | string;
}

export const Modal: FC<ModalWindow> = (props) => {
  const {
    isVisible, children, title, onClose, closeOnClickaway = true, closeOnEscape = true,
  } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    if (closeOnEscape) {
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', escapeHandler);

      return () => document.removeEventListener('keydown', escapeHandler);
    }

    return undefined;
  });

  return isVisible ? (
    <div className="modal-wrapper">
      <div
        className={styles.background}
        onClick={closeOnClickaway ? onClose : undefined}
        data-testid="modal-background"
      />
      <div className={styles.body} data-testid="modal-body">
        <div className={styles.modalHeader}>
          {title}
          <div className={styles.modalHeaderClose}>
            <IconButton
              surface="header"
              data-testid="modal-close-button"
              name="times"
              size="lg"
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.content} data-testid="modal-content">
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

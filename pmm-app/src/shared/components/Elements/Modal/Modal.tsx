import React, {FC, useEffect} from 'react';

import {IconButton, useTheme} from '@grafana/ui';
import { getStyles } from './Modal.styles';
import {Close} from "../Icons/Close";

interface ModalWindow {
  onClose: () => void;
  closeOnClickaway: boolean;
  closeOnEscape: boolean;
  isVisible: boolean;
  title: FC;
}


export const Modal: FC<ModalWindow> = (props) => {
  const { isVisible, children, title, onClose, closeOnClickaway = true, closeOnEscape = true} = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  if (closeOnEscape) {
    useEffect(() => {
      const escapeHandler = (e) => {
        if(e.key === "Escape") {
          onClose()
        }
      };

      document.addEventListener('keydown', escapeHandler);

      return () => {
        document.removeEventListener('keydown', escapeHandler)
      }
    })
  }


  return isVisible
    ? (
      <div className="modal-wrapper">
        <div className={styles.background} onClick={closeOnClickaway ? onClose : undefined}/>
        <div className={styles.body}>
          <div className={styles.modalHeader}>
            {title}
            <div className={styles.modalHeaderClose}>
              <IconButton surface="header" name="times" size="lg" onClick={onClose} />
            </div>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    ) : null;
};

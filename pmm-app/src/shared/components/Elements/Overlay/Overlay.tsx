import React, { FC } from 'react';
import { Spinner } from '@grafana/ui';
import { cx } from 'emotion';
import { OverlayProps } from './Overlay.types';
import { styles } from './Overlay.styles';

export const Overlay: FC<OverlayProps> = ({
  children,
  className,
  dataQa,
  isPending,
  size = 20
}) => (
  <div className={cx(styles.overlayWrapper, className)}>
    {isPending
      ? (
        <>
          <div className={styles.overlay} data-qa={dataQa}>
            <Spinner size={size} className={styles.spinner} />
          </div>
          <div className={styles.childrenWrapper}>
            {children}
          </div>
        </>
      )
      : children}
  </div>
);

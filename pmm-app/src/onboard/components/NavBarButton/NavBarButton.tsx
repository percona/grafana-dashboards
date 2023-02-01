import React, { FC } from 'react';
import {
  Button, ToolbarButton, useStyles2,
} from '@grafana/ui';
import { NavBarButtonTypes } from './NavBarButton.types';
import { getStyles } from './NavBarButton.styles';

export const NavBarButton: FC<NavBarButtonTypes> = ({
  title, imgSrc, imgAlt, icon, onClick,
}) => {
  const styles = useStyles2(getStyles);

  return (
    <>
      { imgSrc ? (
        <Button className={styles.perconaButton} onClick={onClick}>
          <img className={styles.perconaButtonImage} alt={imgAlt} src={imgSrc} />
          <div className={styles.perconaButtonLabel}>{title}</div>
        </Button>
      ) : (
        <ToolbarButton icon={icon} onClick={onClick} title={title} />
      )}
    </>
  );
};

import React, { FC, useMemo, useState } from 'react';
import { IconButton, useStyles } from '@grafana/ui';
import { XtraDBClusterConnectionItem } from '../XtraDBClusterConnectionItem/XtraDBClusterConnectionItem';
import { XtraDBClusterConnectionPasswordProps } from './XtraDBClusterConnectionPassword.types';
import { HIDDEN_PASSWORD_LENGTH } from './XtraDBClusterConnectionPassword.constants';
import { getStyles } from './XtraDBClusterConnectionPassword.styles';

export const XtraDBClusterConnectionPassword: FC<XtraDBClusterConnectionPasswordProps> = ({
  label,
  password,
  dataQa,
}) => {
  const styles = useStyles(getStyles);
  const [showPassword, setShowPassword] = useState(false);
  const getHiddenPassword = useMemo(() => ('*'.repeat(HIDDEN_PASSWORD_LENGTH)), []);

  return (
    <div className={styles.connectionPasswordWrapper}>
      <XtraDBClusterConnectionItem
        label={label}
        value={showPassword ? password : getHiddenPassword}
        dataQa={dataQa}
      />
      <IconButton
        data-qa="show-password-button"
        name={showPassword ? 'eye-slash' : 'eye'}
        onClick={() => setShowPassword(!showPassword)}
        className={styles.showPasswordButton}
      />
    </div>
  );
};

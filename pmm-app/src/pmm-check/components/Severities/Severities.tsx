import React, { FC } from 'react';
import { Severity } from 'pmm-check/types';
import { SEVERITY } from 'pmm-check/CheckPanel.constants';

import * as styles from './Severities.styles';

interface SeveritiesProps {
  severities: Severity[];
}

export const Severities: FC<SeveritiesProps> = ({ severities }) => (
  <ul className={styles.List}>
    {severities.map((severity) => <li className={styles.ListItem}>{SEVERITY[severity]}</li>)}
  </ul>
);

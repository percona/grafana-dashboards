import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TooltipText } from './TooltipText';
import * as styles from './Failed.styles';

export const Failed = (failed: [number, number, number]) => {
  const sum = failed.reduce((acc, val) => acc + val, 0);
  return (
    <div>
      <span className={styles.FailedDiv}>
        {sum} ({failed.join(' / ')})
      </span>
      <Tooltip placement="top" mouseEnterDelay={0.2} title={() => <TooltipText sum={sum} data={failed} />}>
        <InfoCircleOutlined className={styles.InfoIcon} />
      </Tooltip>
    </div>
  );
};

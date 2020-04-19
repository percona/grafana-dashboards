import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import * as styles from './Failed.styles';

interface TooltipTextProps {
  sum: number;
  data: number[];
}

const TooltipText: FC<TooltipTextProps> = ({ sum, data }) => {
  if (!sum) {
    return null;
  }

  const [critical, major, trivial] = data;
  return (
    <div className={styles.TooltipWrapper}>
      <div className={styles.TooltipHeader}>Failed checks: {sum}</div>
      <div>Critical &ndash; {critical}</div>
      <div>Major &ndash; {major}</div>
      <div>Trivial &ndash; {trivial}</div>
    </div>
  );
};

export const Failed = (failed: number[]) => {
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

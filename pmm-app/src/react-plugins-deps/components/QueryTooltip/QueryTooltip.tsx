import { Tooltip } from 'antd';
import Highlight from 'react-highlight.js';
import React from 'react';
import './QueryTooltip.scss';

export const QueryTooltip = ({ query, children, show = true }) => {
  const TooltipContent = () => {
    return <Highlight language="sql">{query}</Highlight>;
  };
  return show ? (
    <Tooltip
      placement="top"
      mouseEnterDelay={0.2}
      overlayClassName="query-tooltip"
      title={() => <TooltipContent />}
    >
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

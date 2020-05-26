import { Tooltip } from 'antd';
import Highlight from 'react-highlight.js';
import React from 'react';
import './QueryTooltip.scss';

interface QueryTooltipProps {
  query: string;
  queryId?: string;
  show?: boolean;
  children: any;
}
export const QueryTooltip = ({ query, queryId, children, show = true }: QueryTooltipProps) => {
  const TooltipContent = () => {
    return <Highlight language="sql">{query}</Highlight>;
  };
  return show ? (
    <Tooltip
      placement="left"
      mouseEnterDelay={0}
      overlayClassName="query-tooltip"
      title={() => (
        <>
          {queryId ? <h5 style={{ margin: '10px' }}>{queryId}</h5> : null}
          <TooltipContent />
        </>
      )}
    >
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

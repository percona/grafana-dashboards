import { Tooltip } from 'antd';
import Highlight from 'react-highlight.js';
import React from 'react';
import './QueryTooltip.scss';
import sqlFormatter from 'sql-formatter';

interface QueryTooltipProps {
  query: string;
  queryId?: string;
  show?: boolean;
  children: any;
}
export const QueryTooltip = ({
  query, queryId, children, show = true
}: QueryTooltipProps) => (show ? (
  <Tooltip
    placement="left"
    mouseEnterDelay={0}
    data-qa="query-tooltip"
    overlayClassName="query-tooltip"
    title={() => (
      <div className="query-tooltip-data-wrapper">
        {queryId ? <h5 style={{ margin: '10px' }}>{`Query Id: ${queryId}`}</h5> : null}
        {query ? <Highlight language="sql">{sqlFormatter.format(query)}</Highlight> : null}
      </div>
    )}
  >
    {children}
  </Tooltip>
) : (
  <>{children}</>
));

import { Tooltip } from 'antd';
import React from 'react';
import './QueryTooltip.scss';
import sqlFormatter from 'sql-formatter';
import { Highlight } from 'pmm-qan/panel/components/Highlight/Highlight';

interface QueryTooltipProps {
  query: string;
  queryId?: string;
  show?: boolean;
  children: any;
}
export const QueryTooltip = ({
  query, queryId, children, show = true,
}: QueryTooltipProps) => (show ? (
  <Tooltip
    placement="left"
    mouseEnterDelay={0}
    data-qa="query-tooltip"
    overlayClassName="query-tooltip"
    title={() => (
      <div className="query-tooltip-data-wrapper">
        {queryId ? <h5 style={{ margin: '10px' }}>{`Query Id: ${queryId}`}</h5> : null}
        {query ? <Highlight language="sql">{sqlFormatter.format(query, { language: 'pl/sql' })}</Highlight> : null}
      </div>
    )}
  >
    {children}
  </Tooltip>
) : (
  <>{children}</>
));

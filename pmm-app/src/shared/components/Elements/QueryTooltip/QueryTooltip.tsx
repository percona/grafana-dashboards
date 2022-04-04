import { Tooltip } from 'antd';
import React from 'react';
import { useStyles } from '@grafana/ui';
import sqlFormatter from 'sql-formatter';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import { getStyles } from './QueryTooltip.styles';

interface QueryTooltipProps {
  query: string;
  queryId?: string;
  show?: boolean;
  children: any;
  float?: string;
}
export const QueryTooltip = ({
  query, queryId, children, show = true, float = 'none',
}: QueryTooltipProps) => {
  const styles = useStyles(getStyles);

  return show ? (
    <Tooltip
      placement="left"
      mouseEnterDelay={0}
      data-testid="query-tooltip"
      overlayClassName={styles.queryTooltip(float)}
      title={() => (
        <div className={styles.queryTooltipDataWrapper}>
          {queryId ? <h5 className={styles.queryId}>{`Query Id: ${queryId}`}</h5> : null}
          {query ? <Highlight language="sql">{sqlFormatter.format(query, { language: 'pl/sql' })}</Highlight> : null}
        </div>
      )}
    >
      {children}
    </Tooltip>
  ) : (
    <>{children}</>
  );
};

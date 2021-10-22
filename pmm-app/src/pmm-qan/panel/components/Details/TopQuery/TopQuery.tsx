import React, { FC, useContext, useCallback } from 'react';
import { useStyles } from '@grafana/ui';
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { Info } from 'shared/components/Elements/Icons/Info';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { getStyles } from './TopQuery.styles';
import { TopQueryProps } from './TopQuery.types';

export const TopQuery: FC<TopQueryProps> = ({
  databaseType,
  query,
  queryId,
}) => {
  const styles = useStyles(getStyles);
  const { contextActions } = useContext(QueryAnalyticsProvider);
  const selectQuery = useCallback(() => {
    contextActions.setDimensionSearchText({ search: queryId });
    contextActions.selectQuery(
      {
        queryId,
        database: databaseType,
      },
      false,
    );
  }, [contextActions, queryId, databaseType]);

  return (
    <div data-testid="top-query" className={styles.wrapper}>
      <div className={styles.query} onClick={selectQuery}>
        {query}
      </div>
      <QueryTooltip query={query} queryId={queryId} float="right">
        <Info className={styles.tooltipIcon} />
      </QueryTooltip>
    </div>
  );
};

import { useCallback, useContext, useEffect, useState } from 'react';
import OverviewTableService from './OverviewTable.service';
import { getDefaultColumns, getOverviewColumn } from './Columns';
import { QueryAnalyticsProvider } from '../../panel/QueryAnalyticsProvider';
import { DataInterface } from './OverviewTable.types';

export const useOverviewTable = (setTotal): [DataInterface, boolean] => {
  const {
    contextActions,
    panelState: { labels, columns, pageNumber, pageSize, orderBy, from, to, groupBy, rawTime },
  } = useContext(QueryAnalyticsProvider);
  const [data, setData] = useState<DataInterface>({ rows: [], columns: [] });
  const [loading, setLoading] = useState(false);

  const onCell = useCallback(
    (record, rowIndex) => {
      return {
        onClick: () => contextActions.selectQuery(record.dimension),
      };
    },
    [data.rows]
  );

  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
        // @ts-ignore
        const result = await OverviewTableService.getReport({
          labels,
          columns,
          pageNumber,
          pageSize,
          orderBy,
          from,
          to,
          groupBy,
        });

        setTotal(result.total_rows);
        const calculatedColumns = getDefaultColumns(
          groupBy,
          pageNumber,
          pageSize,
          columns.length,
          onCell
        ).concat(columns.map((key, index) => getOverviewColumn(key, index, result.rows[0], orderBy)));
        // @ts-ignore
        setData({ rows: result.rows, columns: calculatedColumns });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    updateInstances().then(() => {});
  }, [columns, pageNumber, pageSize, groupBy, labels, orderBy, from, to, rawTime]);

  return [data, loading];
};

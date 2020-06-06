import {
  useCallback, useContext, useEffect, useState
} from 'react';
import OverviewTableService from './OverviewTable.service';
import { PanelProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import { DataInterface } from './OverviewTable.types';
import { getOverviewColumn } from './components/MetricColumns/MetricColumns';
import { getDefaultColumns } from './components/DefaultColumns/DefaultColumns';

export const useOverviewTable = (setTotal): [DataInterface, boolean] => {
  const {
    contextActions,
    panelState: {
      labels, columns, pageNumber, pageSize, orderBy, from, to, groupBy, rawTime
    },
  } = useContext(PanelProvider);
  const [data, setData] = useState<DataInterface>({ rows: [], columns: [] });
  const [loading, setLoading] = useState(false);

  const onCell = useCallback(
    (record, rowIndex) => ({
      onClick: () => {
        contextActions.selectQuery(record.dimension, rowIndex === 0);
      },
    }),
    [data.rows]
  );

  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
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
        const defaultColumns = getDefaultColumns(groupBy, pageNumber, pageSize, columns.length, onCell);

        const mainMetric = columns[0];
        // eslint-disable-next-line max-len
        const metricsColumns = columns.map((key, index) => getOverviewColumn(key, index, result.rows[0], orderBy, mainMetric));

        setData({ rows: result.rows, columns: [...defaultColumns, ...metricsColumns] });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    updateInstances().then(() => {});
  }, [columns, pageNumber, pageSize, groupBy, labels, orderBy, from, to, rawTime]);

  return [data, loading];
};

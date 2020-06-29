import {
  useContext, useEffect, useState
} from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import OverviewService from './Overview.service';
import { DataInterface } from './Overview.types';
import { getOverviewColumn } from './components/MetricColumns/MetricColumns';
import { getDefaultColumns } from './components/DefaultColumns/DefaultColumns';

export const useOverviewTable = (setTotal): [DataInterface, boolean] => {
  const {
    // contextActions,
    panelState: {
      labels, columns, pageNumber, pageSize, orderBy, from, to, groupBy, rawTime
    },
  } = useContext(QueryAnalyticsProvider);
  const [data, setData] = useState<DataInterface>({ rows: [], columns: [] });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const updateInstances = async () => {
      try {
        setLoading(true);
        const result = await OverviewService.getReport({
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
        const defaultColumns = getDefaultColumns(groupBy, pageNumber, pageSize, columns.length);

        const mainMetric = columns[0];
        // eslint-disable-next-line max-len
        const metricsColumns = columns.map((key, index) => getOverviewColumn(key, index, result.rows[0], orderBy, mainMetric));

        const allColumns = [...defaultColumns, ...metricsColumns];

        setData({ rows: result.rows, columns: allColumns });
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    updateInstances().then(() => {});
  }, [columns, pageNumber, pageSize, groupBy, labels, orderBy, from, to, rawTime]);

  return [data, loading];
};

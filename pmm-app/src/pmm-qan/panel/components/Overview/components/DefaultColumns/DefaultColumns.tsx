// TODO: calculate table width right and remove it
import React from 'react';
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { Info } from 'shared/components/Elements/Icons/Info';
import {
  COLUMN_WIDTH,
  FIXED_COLUMN_WIDTH,
  MAIN_METRIC_MIN_WIDTH,
  ROW_NUMBER_COLUMN_WIDTH,
} from '../../Overview.constants';
import { mainMetric, metricWrapper, tooltipIcon } from './DefaultColumns.styles';
import { Dimension } from '../Dimension/Dimension';

const getMainColumnWidth = (columns) => {
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);

  return Math.max(
    width - (columns - 1) * FIXED_COLUMN_WIDTH - COLUMN_WIDTH * 1.8 - ROW_NUMBER_COLUMN_WIDTH - 2,
    MAIN_METRIC_MIN_WIDTH
  );
};

// const rowNumberRender = (pageSize, pageNumber) => (record, index) => (
//   <div className={rowNumber}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
// );

const dimensionColumnRender = (mainMetricColumnWidth) => (record, index) => (
  <div className={metricWrapper}>
    <div className={mainMetric(mainMetricColumnWidth, index === 0)}>
      {index === 0 ? 'TOTAL' : record.fingerprint || record.dimension || 'N/A'}
    </div>
    {index !== 0 && record.fingerprint ? (
      <QueryTooltip query={record.fingerprint} queryId={record.dimension}>
        <Info className={tooltipIcon} />
      </QueryTooltip>
    ) : null}
  </div>
);

export const getDefaultColumns = (groupBy, pageNumber, pageSize, columns) => {
  const mainMetricColumnWidth = getMainColumnWidth(columns);

  return [
    // {
    //   Header: '#',
    //   // dataIndex: 'rowNumber',
    //   // key: 'rowNumber',
    //   // fixed: 'left',
    //   // width: ROW_NUMBER_COLUMN_WIDTH,
    //   accessor: rowNumberRender(pageSize, pageNumber),
    // },
    {
      // dataIndex: 'mainMetric',
      // fixed: 'left',
      width: mainMetricColumnWidth,
      Header: 'Main column',
      HeaderAccessor: () => <Dimension />,
      // ellipsis: true,
      // className: mainColumn,
      // key: 'dimension',
      // onCell,
      accessor: dimensionColumnRender(mainMetricColumnWidth),
    },
  ];
};

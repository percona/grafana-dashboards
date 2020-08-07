// TODO: calculate table width right and remove it
import React from 'react';
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { Info } from 'shared/components/Elements/Icons/Info';
import {
  COLUMN_WIDTH,
  FIXED_COLUMN_WIDTH,
  MAIN_METRIC_MIN_WIDTH,
  ROW_NUMBER_COLUMN_WIDTH, SCROLLBAR_WIDTH,
} from '../../Overview.constants';
import { mainMetric, metricWrapper, tooltipIcon } from './DefaultColumns.styles';
import { Dimension } from '../Dimension/Dimension';

// eslint-disable-next-line max-len
const getAllColumns = (columns) => (columns - 1) * FIXED_COLUMN_WIDTH + COLUMN_WIDTH * 1.8 + ROW_NUMBER_COLUMN_WIDTH;

export const getMainColumnWidth = (columns) => {
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);

  return Math.max(
    width - getAllColumns(columns) + FIXED_COLUMN_WIDTH - SCROLLBAR_WIDTH - 2,
    MAIN_METRIC_MIN_WIDTH
  );
};

export const getAllColumnsWidth = (mainColumnWidth, columns) => {
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);

  return Math.max(getAllColumns(columns) + mainColumnWidth - FIXED_COLUMN_WIDTH, width) - SCROLLBAR_WIDTH - 2;
};

const dimensionColumnRender = (record, index) => (
  <div className={metricWrapper}>
    <div className={mainMetric(index === 0)}>
      {index === 0 ? 'TOTAL' : record.fingerprint || record.dimension || 'N/A'}
    </div>
    {index !== 0 && record.fingerprint ? (
      <QueryTooltip query={record.fingerprint} queryId={record.dimension}>
        <Info className={tooltipIcon} />
      </QueryTooltip>
    ) : null}
  </div>
);

export const getDefaultColumns = () => [
  {
    Header: 'Main column',
    HeaderAccessor: () => <Dimension />,
    accessor: dimensionColumnRender,
  },
];

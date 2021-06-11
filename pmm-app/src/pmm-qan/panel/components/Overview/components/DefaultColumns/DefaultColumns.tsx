// TODO: calculate table width right and remove it
import React from 'react';
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { Info } from 'shared/components/Elements/Icons/Info';
import { useTheme } from '@grafana/ui';
import {
  COLUMN_WIDTH,
  FIXED_COLUMN_WIDTH,
  MAIN_METRIC_MIN_WIDTH,
  ROW_NUMBER_COLUMN_WIDTH,
  SCROLLBAR_WIDTH,
} from '../../Overview.constants';
import { Dimension } from '../Dimension/Dimension';
import { getStyles } from './DefaultColumns.styles';

// eslint-disable-next-line max-len
const getAllColumns = (columns) => (columns - 1) * FIXED_COLUMN_WIDTH + COLUMN_WIDTH * 1.8 + ROW_NUMBER_COLUMN_WIDTH;

// Get width of a main column based on a number of available metrics columns
export const getMainColumnWidth = (columns) => {
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);

  return Math.max(
    width - getAllColumns(columns) + FIXED_COLUMN_WIDTH - SCROLLBAR_WIDTH,
    MAIN_METRIC_MIN_WIDTH,
  );
};

// Get width of all columns together to calculate container size
export const getAllColumnsWidth = (mainColumnWidth, columns) => {
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);

  return Math.max(getAllColumns(columns) + mainColumnWidth - FIXED_COLUMN_WIDTH, width) - SCROLLBAR_WIDTH;
};

const DimensionColumnRender = ({ fingerprint, dimension }, index) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div className={styles.metricWrapper}>
      <div className={styles.getMainMetric(index === 0)}>
        {index === 0 ? 'TOTAL' : fingerprint || dimension || 'N/A'}
      </div>
      {index !== 0 && fingerprint ? (
        <QueryTooltip query={fingerprint} queryId={dimension}>
          <Info className={styles.tooltipIcon} />
        </QueryTooltip>
      ) : null}
    </div>
  );
};

export const getDefaultColumns = () => [
  {
    Header: 'Main column',
    HeaderAccessor: () => <Dimension />,
    accessor: DimensionColumnRender,
  },
];

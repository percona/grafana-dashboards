// TODO: calculate table width right and remove it
import React from 'react';
import {
  COLUMN_WIDTH,
  FIXED_COLUMN_WIDTH,
  MAIN_METRIC_MIN_WIDTH,
  ROW_NUMBER_COLUMN_WIDTH,
} from '../../OverviewTable.constants';
import {
  mainColumn, mainMetric, metricWrapper, rowNumber, tooltipIcon,
} from './DefaultColumns.styles';
import { GroupByControl } from '../GroupByControl/GroupByControl';
// eslint-disable-next-line max-len
import { QueryTooltip } from '../../../../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';
import { Info } from '../../../../../../../react-plugins-deps/components/Elements/Icons/Info';

const getMainColumnWidth = (columns) => {
  /* TODO(lunaticusgreen): add something more elegant */
  const container = document.querySelector('.table-wrapper');
  const width = +((container && container.clientWidth) || 0);
  return Math.max(
    width - (columns - 1) * FIXED_COLUMN_WIDTH - COLUMN_WIDTH * 1.8 - ROW_NUMBER_COLUMN_WIDTH - 2,
    MAIN_METRIC_MIN_WIDTH,
  );
};

export const getDefaultColumns = (groupBy, pageNumber, pageSize, columns, onCell) => {
  const mainMetricColumnWidth = getMainColumnWidth(columns);
  // @ts-ignore
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      fixed: 'left',
      width: ROW_NUMBER_COLUMN_WIDTH,
      render: (text, record, index) => (
        <div className={rowNumber}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
      ),
    },
    {
      dataIndex: 'mainMetric',
      fixed: 'left',
      width: mainMetricColumnWidth,
      title: () => <GroupByControl />,
      ellipsis: true,
      className: mainColumn,
      onCell,
      render: (text, record, index) => (
        <div className={metricWrapper}>
          <div className={mainMetric(mainMetricColumnWidth, index === 0)}>
            {index === 0 ? 'TOTAL' : record.fingerprint || record.dimension || 'N/A'}
          </div>
          {index !== 0 && record.fingerprint ? (
            <QueryTooltip query={record.fingerprint}>
              <Info className={tooltipIcon} />
            </QueryTooltip>
          ) : null}
        </div>
      ),
    },
  ];
};

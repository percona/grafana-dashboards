import React from 'react';
// eslint-disable-next-line max-len
import { QueryTooltip } from '../../../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';
import { GROUP_BY_OPTIONS } from './Fingerprint.constants';
import { Styling } from './Fingerprint.styles';
import { CloseOutlined } from '@ant-design/icons';
import { Icon } from 'antd';

const Fingerprint = props => {
  const currentGroupBy = GROUP_BY_OPTIONS.filter(option => option.value === props.groupBy)[0];
  return (
    <div className={Styling.fingerprintWrapper} id="query-id">
      <div className={Styling.fingerprintView}>
        <h4>{!props.totals ? `${currentGroupBy.data.label} : ` : 'TOTAL'}</h4>
        &nbsp;
        {!props.totals ? (
          <div>
            <div className={Styling.fingerprint} style={{ color: 'rgba(32, 215, 255, 0.8)' }}>
              {props.query || 'N/A'}
            </div>
          </div>
        ) : null}
        <QueryTooltip query={props.query} show={props.groupBy === 'queryid'}>
          <Icon type="question-circle" className={Styling.tooltipIcon} />
        </QueryTooltip>
      </div>
      <CloseOutlined className={Styling.closeButton} onClick={props.closeDetails} />
    </div>
  );
};

export default Fingerprint;

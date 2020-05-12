import React from 'react';
// eslint-disable-next-line max-len
import { QueryTooltip } from '../../../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';
import { GROUP_BY_OPTIONS } from './Fingerprint.constants';
import { Styling } from './Fingerprint.styles';
import { CloseOutlined } from '@ant-design/icons';

const Fingerprint = props => {
  const currentGroupBy = GROUP_BY_OPTIONS.filter(option => option.value === props.groupBy)[0];
  return (
    <div className={Styling.fingerprintWrapper} id="query-id">
      <div className={Styling.fingerprintView}>
        <h4>{!props.totals ? `${currentGroupBy.data.label}:` : 'TOTAL'}</h4>
        &nbsp;
        {!props.totals ? (
          <div>
            <QueryTooltip query={props.query} show={props.groupBy === 'queryid'}>
              <h5 className={Styling.fingerprint}>{props.query || 'N/A'}</h5>
            </QueryTooltip>
          </div>
        ) : null}
      </div>
      <CloseOutlined style={{ marginLeft: 'auto' }} onClick={props.closeDetails} />
    </div>
  );
};

export default Fingerprint;

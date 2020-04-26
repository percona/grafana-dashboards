import React from 'react';
import { QueryTooltip } from '../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';
import { GROUP_BY_OPTIONS } from './Fingerprint.constants';
import { Styling } from './Fingerprint.styles';

const Fingerprint = props => {
  const currentGroupBy = GROUP_BY_OPTIONS.filter(option => option.value === props.groupBy)[0];
  const isTotal = props.query === 'TOTAL' || props.query === undefined;
  return (
    <div className={Styling.fingerprintWrapper} id="query-id">
      <div className={Styling.fingerprintView}>
        <h4>{!isTotal ? `${currentGroupBy.data.label}:` : 'TOTAL'}</h4>
        &nbsp;
        {!isTotal ? (
          <div>
            <QueryTooltip query={props.query} show={props.groupBy === 'queryid'}>
              <h5 className={Styling.fingerprint}>{props.query}</h5>
            </QueryTooltip>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Fingerprint;

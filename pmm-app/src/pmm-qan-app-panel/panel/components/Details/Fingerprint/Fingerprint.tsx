import React from 'react';
// eslint-disable-next-line max-len
import { QueryTooltip } from 'shared/components/Elements/QueryTooltip/QueryTooltip';
import { Close } from 'shared/components/Elements/Icons/Close';
import { Info } from 'shared/components/Elements/Icons/Info';
import { GROUP_BY_OPTIONS } from './Fingerprint.constants';
import { styles } from './Fingerprint.styles';

const Fingerprint = (props) => {
  const {
    totals, query, queryId, groupBy, closeDetails
  } = props;
  const currentGroupBy = GROUP_BY_OPTIONS.filter((option) => option.value === groupBy)[0];
  return (
    <div className={styles.fingerprintWrapper} id="query-id">
      <div className={styles.fingerprintView}>
        <h4>{!totals ? `${currentGroupBy.data.label} : ` : 'TOTAL'}</h4>
        &nbsp;
        {!totals ? (
          <div>
            <div className={styles.fingerprint}>{query || 'N/A'}</div>
          </div>
        ) : null}
        {groupBy === 'queryid' && !totals ? (
          <QueryTooltip query={query} queryId={queryId}>
            <Info className={styles.tooltipIcon} />
          </QueryTooltip>
        ) : null}
      </div>
      <Close className={styles.closeButton} onClick={closeDetails} />
    </div>
  );
};

export default Fingerprint;

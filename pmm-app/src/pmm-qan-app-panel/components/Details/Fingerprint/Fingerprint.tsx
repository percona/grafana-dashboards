import React from 'react';
import { css } from 'emotion';
import { QueryTooltip } from '../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';

const GROUP_BY_OPTIONS = [
  { value: 'queryid', data: { label: 'Query' } },
  { value: 'service_name', data: { label: 'Service Name' } },
  { value: 'database', data: { label: 'Database' } },
  { value: 'schema', data: { label: 'Schema' } },
  { value: 'username', data: { label: 'User Name' } },
  { value: 'client_host', data: { label: 'Client Host' } },
];

const Styling = {
  fingerprintWrapper: css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,
  controlSum: css`
    color: gray;
  `,
  fingerprintView: css`
    display: flex;
    align-items: baseline;
  `,
  fingerprint: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 600px;
    overflow: hidden;
    color: #32b3e3 !important;
    cursor: help;
  `,
};
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

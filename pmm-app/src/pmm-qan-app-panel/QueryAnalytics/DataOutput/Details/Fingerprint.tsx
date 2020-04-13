import React from 'react';
import { css } from 'emotion';

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
};
const Fingerprint = props => {
  const currentGroupBy = GROUP_BY_OPTIONS.filter(option => option.value === props.groupBy)[0];
  return (
    <div className={Styling.fingerprintWrapper} id="query-id">
      <h4>{props.query === 'TOTAL' ? 'TOTAL' : `${currentGroupBy.data.label}: ${props.query}`}</h4>
      <h5 className={Styling.controlSum}>{props.controlSum}</h5>
    </div>
  );
};

export default Fingerprint;

import React from 'react';

const GROUP_BY_OPTIONS = [
  { value: 'queryid', data: { label: 'Query' } },
  { value: 'service_name', data: { label: 'Service Name' } },
  { value: 'database', data: { label: 'Database' } },
  { value: 'schema', data: { label: 'Schema' } },
  { value: 'username', data: { label: 'User Name' } },
  { value: 'client_host', data: { label: 'Client Host' } },
];

const Fingerprint = props => {
  console.log(props, GROUP_BY_OPTIONS);
  const currentGroupBy = GROUP_BY_OPTIONS.filter(option => option.value === props.groupBy)[0];
  return (
    <div className={'query-identifier'} id={'query-id'} style={{ marginTop: '10px' }}>
      <h4>{`${currentGroupBy.data.label}: ${props.query}`}</h4>
      <h5 style={{ color: 'gray' }}>{props.controlSum}</h5>
    </div>
  );
};

export default Fingerprint;

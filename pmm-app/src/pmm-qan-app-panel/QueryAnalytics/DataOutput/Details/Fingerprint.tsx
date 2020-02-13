import React from 'react';

const Fingerprint = props => {
  return (
    <div className={'query-identifier'} id={'query-id'} style={{ marginTop: '10px' }}>
      <h4>{props.query}</h4>
      <h5 style={{ color: 'gray' }}>{props.controlSum}</h5>
    </div>
  );
};

export default Fingerprint;

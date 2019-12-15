import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Fingerprint = props => {
  return (
    <div className={'query-identifier'} id={'query-id'}>
      <h4>{props.query}</h4>
      <h5 style={{ color: 'gray' }}>{props.controlSum}</h5>
    </div>
  );
};

export default Fingerprint;

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Fingerprint = props => {
  return (
    <div className={'query-identifier'} id={'query-id'}>
      <div>
        <Title level={4}>{props.query}</Title>
      </div>

      <div>
        <Title level={4}>{props.controlSum}</Title>
      </div>
    </div>
  );
};

export default Fingerprint;

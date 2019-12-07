import React from 'react';
import {Button, Col, Row} from 'antd';

const Diagnostics = props => {
  return (
    <>
      <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '20px' }}>
          <span>We will have a box for troubleshooting - how to download logs (PMM Server logs.zip)</span>
        </Col>
      </Row>
      <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '20px' }}>
          <Button icon={'download'}>Download PMM Server Logs</Button>
        </Col>
      </Row>
    </>
  );
};

export default Diagnostics;

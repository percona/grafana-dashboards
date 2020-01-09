import React from 'react';
import { Button, Col, Row } from 'antd';

const Diagnostics = () => {
  return (
    <>
      <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
        <Col span={24}>
          You can download server logs to make the problem detection simpler. Please include this file if you are submitting a bug report.
        </Col>
      </Row>
      <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '20px' }}>
          <Button icon={'download'} href={'/logs.zip'}>
            Download PMM Server Logs
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Diagnostics;

import React from 'react';
import { Col, Row } from 'antd';

const Diagnostics = props => {
  return (
    <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
      <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
        <span>Access to logs</span>
      </Col>
      <Col span={2}></Col>
    </Row>
  );
};

export default Diagnostics

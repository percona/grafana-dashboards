import React from 'react';
import { Button, Col, Row } from 'antd';
import { styles } from './Diagnostics.style';

const Diagnostics = () => (
  <>
    <Row className={styles.row} align="middle">
      <Col span={24}>
        You can download server logs to make the problem detection simpler. Please include this file if you
        are submitting a bug report.
      </Col>
    </Row>
    <Row className={styles.row} align="middle">
      <Col span={12} className={styles.column}>
        <Button icon="download" href="/logs.zip">
          Download PMM Server Logs
        </Button>
      </Col>
    </Row>
  </>
);

export default Diagnostics;

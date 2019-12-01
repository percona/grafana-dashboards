import { Col, Icon, Row, Tooltip } from 'antd';
import React from 'react';

export const VerticalFormWrapper = props => (
  <Row style={{ color: 'white', marginBottom: '10px' }} align={'middle'}>
    <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
      <span>{props.label}</span>
    </Col>
    <Col span={8}>{props.element}</Col>
    <Col span={1}>{props.tooltip || ''}</Col>
  </Row>
);
export const PluginTooltip = ({ url, linkText, text }) => {
  return (
    <Tooltip
      placement="topLeft"
      title={
        <>
          {text} <a href={url || ''}>{linkText || 'Read more'}</a>
        </>
      }
      style={{ background: 'deepskyblue' }}
    >
      <Icon type="question-circle" style={{ marginLeft: '5px' }} />
    </Tooltip>
  );
};

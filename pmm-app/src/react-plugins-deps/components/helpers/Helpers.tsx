import { Col, Icon, Row, Tooltip } from 'antd';
import React from 'react';

export const VerticalFormWrapper = props => {
  let alignLabel;
  switch (props.alignLabel) {
    case 'top':
      alignLabel = 'flex-start';
      break;
    case 'middle':
      alignLabel = 'center';
      break;
    case 'bottom':
      alignLabel = 'flex-end';
      break;
    default:
      alignLabel = 'center';
  }
  return (
    <Row style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: alignLabel }} align={'middle'}>
      <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
        <span>{props.label}</span>
        <span>{props.tooltip || ''}</span>
      </Col>
      <Col span={8}>{props.element}</Col>
      {/*<Col span={1}>{props.tooltip || ''}</Col>*/}
    </Row>
  );
};
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

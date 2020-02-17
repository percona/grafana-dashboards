import './FormElement.less';
import { Col, Row } from 'antd';
import React from 'react';

const HorizontalFieldLayout = ({ label, tooltip, alignLabel, element }) => {
  return (
    <>
      <Row align={'middle'}>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '20px' }}>
          <strong>{label}</strong>
          <span>{tooltip || ''}</span>
        </Col>
        <Col span={16}>{element}</Col>
      </Row>
    </>
  );
};

const VerticalFieldLayout = ({ label, tooltip, alignLabel, element }) => {
  return (
    <>
      <Row align={'middle'} style={{ paddingBottom: '5px' }}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '20px' }}>
          <strong>{label}</strong>
          <span>{tooltip || ''}</span>
        </Col>
      </Row>
      <Row style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: alignLabel }} align={'middle'}>
        <Col span={24}>{element}</Col>
      </Row>
    </>
  );
};
export const FormElement = props => {
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
    <div style={{ width: '600px', marginBottom: '20px' }}>
      {props.type == 'horizontal' ? <HorizontalFieldLayout {...props} /> : <VerticalFieldLayout {...props} />}
      <Row style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: alignLabel }} align={'middle'}>
        <Col span={24}>{props.errors}</Col>
      </Row>
    </div>
  );
};

import { Col, Row } from 'antd';
import React from 'react';
import { css } from 'emotion';

const style = {
  verticalFieldLabelRow: css`
    padding-bottom: 5px;
  `,
  formElementWrapper: css`
    width: 600px;
    margin-bottom: 20px;
  `,
  fieldLabelColumn: css`
    display: flex;
    justify-content: flex-start;
    padding-right: 20px;
  `,
};

const getErrorsWrapperStyle = align => {
  let alignLabel;
  switch (align) {
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
  return css`
    color: white;
    margin-bottom: 10px;
    display: flex;
    align-items: ${alignLabel};
  `;
};

const HorizontalFieldLayout = ({ label, tooltip, element }) => {
  return (
    <>
      <Row align="middle">
        <Col span={8} className={style.fieldLabelColumn}>
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
      <Row align="middle" className={style.verticalFieldLabelRow}>
        <Col span={24} className={style.fieldLabelColumn}>
          <strong>{label}</strong>
          <span>{tooltip || ''}</span>
        </Col>
      </Row>
      <Row className={getErrorsWrapperStyle(alignLabel)} align="middle">
        <Col span={24}>{element}</Col>
      </Row>
    </>
  );
};

export const FormElement = props => {
  return (
    <div className={style.formElementWrapper}>
      {props.type === 'horizontal' ? <HorizontalFieldLayout {...props} /> : <VerticalFieldLayout {...props} />}
      <Row className={getErrorsWrapperStyle(props.alignLabel)} align="middle">
        <Col span={24}>{props.errors}</Col>
      </Row>
    </div>
  );
};

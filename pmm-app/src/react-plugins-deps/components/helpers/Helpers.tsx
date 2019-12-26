import { Col, Icon, Row, Tooltip } from 'antd';
import React, { ReactComponentElement } from 'react';

interface VerticalFormWrapperInterface {
  alignLabel?: string;
  label: string;
  tooltip: string | JSX.Element;
  // Add correct type for element
  element: ReactComponentElement<any, any>;
}

export const VerticalFormWrapper = (props: VerticalFormWrapperInterface) => {
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
    </Row>
  );
};

interface PluginTooltipInterface {
  url: string;
  linkText: string;
  text: string;
}

export const PluginTooltip = ({ url, linkText, text }: PluginTooltipInterface) => {
  return (
    <Tooltip
      placement="topLeft"
      title={
        <>
          {text}{' '}
          <a style={{ color: 'white', textDecoration: 'underline' }} href={url || ''} target="_blank" rel="noopener noreferrer">
            {linkText || 'Read more'}
          </a>
        </>
      }
      style={{ background: 'deepskyblue' }}
    >
      <Icon type="question-circle" style={{ marginLeft: '5px' }} />
    </Tooltip>
  );
};

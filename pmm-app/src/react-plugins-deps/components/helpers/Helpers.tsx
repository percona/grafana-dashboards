import { Col, Icon, Row, Tooltip } from 'antd';
import React, { ReactComponentElement } from 'react';

interface VerticalFormWrapperInterface {
  alignLabel?: string;
  label: string;
  tooltip?: React.ReactNode;
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

interface Link {
  url: string;
  text: string;
}

interface PluginTooltipInterface {
  text: string;
  links: Link[];
}

export const PluginTooltip = ({ text, links }: PluginTooltipInterface) => {
  return (
    <Tooltip
      placement="topLeft"
      title={
        <>
          {text} <br />
          {links.map(link => {
            return (
              <>
                <a style={{ color: 'white', textDecoration: 'underline' }} href={link.url || ''} target="_blank" rel="noopener noreferrer">
                  {link.text || 'Read more'}
                </a>
                <br />
              </>
            );
          })}
        </>
      }
      style={{ background: 'deepskyblue' }}
    >
      <Icon type="question-circle" style={{ marginLeft: '5px' }} />
    </Tooltip>
  );
};

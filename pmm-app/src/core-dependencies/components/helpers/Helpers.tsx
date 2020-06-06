import { Icon, Tooltip } from 'antd';
import React from 'react';

interface Link {
  url: string;
  text: string;
}

interface PluginTooltipInterface {
  text: string;
  links: Link[];
}

export const PluginTooltip = ({ text, links }: PluginTooltipInterface) => (
  <Tooltip
    placement="topLeft"
    title={(
      <>
        {text}
        {' '}
        <br />
        {links.map((link) => (
          <div key={link.url}>
            <a
              style={{ color: 'white', textDecoration: 'underline' }}
              href={link.url || ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text || 'Read more'}
            </a>
            <br />
          </div>
        ))}
      </>
    )}
    style={{ background: 'deepskyblue' }}
  >
    <Icon type="question-circle" style={{ marginLeft: '5px' }} />
  </Tooltip>
);

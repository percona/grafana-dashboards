import ReactJson from 'react-json-view';
import React from 'react';

// TODO: remove stryling code duplicates
const THEME_JSON_VIEW = {
  base00: 'transparent',
  base01: 'transparent',
  base02: 'lightgray',
  base03: '#bfbfbf',
  base04: '#1890ff',
  base05: '#bfbfbf',
  base06: '#bfbfbf',
  base07: '#bfbfbf',
  base08: '#bfbfbf',
  base09: 'white',
  base0A: 'white',
  base0B: 'white',
  base0C: 'white',
  base0D: 'white',
  base0E: 'white',
  base0F: 'white',
};

export const ReactJSON = ({ json = {} }) => <ReactJson src={json} theme={THEME_JSON_VIEW} />;

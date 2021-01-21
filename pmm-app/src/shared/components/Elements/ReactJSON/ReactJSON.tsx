import ReactJson from 'react-json-view';
import React from 'react';

// TODO: remove stryling code duplicates
const THEME_JSON_VIEW = {
  base00: 'transparent',
  base01: 'transparent',
  base02: 'lightgray',
  base03: '#9372a4',
  base04: '#1890ff',
  base05: '#9372a4',
  base06: '#9372a4',
  base07: '#9372a4',
  base08: '#9372a4',
  base09: '#6897bb',
  base0A: 'white',
  base0B: '#6a8759',
  base0C: 'white',
  base0D: 'white',
  base0E: 'white',
  base0F: 'white',
};

export const ReactJSON = ({ json = {} }) => (
  <ReactJson src={json} theme={THEME_JSON_VIEW} collapseStringsAfterLength={50} displayDataTypes={false} />
);

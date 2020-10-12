import React from 'react';
import { Spin } from 'antd';
import { css } from 'emotion';
import { Spinner } from '@grafana/ui';

const spinnerStyle = css`
  color: rgb(211, 211, 211);
`;

Spin.setDefaultIndicator(
  <Spinner className={spinnerStyle} data-qa="loading-spinner" />,
);

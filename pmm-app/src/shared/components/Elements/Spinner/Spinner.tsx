import React from 'react';
import { Spin } from 'antd';
import { css } from '@emotion/css';
import { Spinner } from '@grafana/ui';

const spinnerStyle = css`
  color: rgb(211, 211, 211);
`;

Spin.setDefaultIndicator(
  <Spinner className={spinnerStyle} data-testid="loading-spinner" />,
);

import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Spin } from 'antd';
import { css, cx } from 'emotion';

library.add(fas);

const spinnerStyle = css`
  color: rgb(211, 211, 211);
  font-size: 36px;
`;

Spin.setDefaultIndicator(
  <i className={cx('fa fa-spinner fa-spin spinner', spinnerStyle)} data-qa="loading-spinner" />
);

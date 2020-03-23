import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Spin } from 'antd';

library.add(fas);

Spin.setDefaultIndicator(
  <i className="fa fa-spinner fa-spin spinner" style={{ color: 'rgb(211,211,211)', fontSize: '36px' }}></i>
);

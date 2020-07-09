import { Button } from 'antd';
import React from 'react';
import { ButtonElementInterface } from './Button.types';
import { Styling } from './Button.styles';

const ButtonElement = ({
  loading = false,
  disabled = false,
  onClick,
  text,
  htmlType = 'submit',
}: ButtonElementInterface) => (
  <Button
    onClick={onClick || (() => {})}
    type="primary"
    htmlType={htmlType}
    loading={loading}
    disabled={disabled}
    className={Styling.button}
  >
    {text}
  </Button>
);

export default ButtonElement;

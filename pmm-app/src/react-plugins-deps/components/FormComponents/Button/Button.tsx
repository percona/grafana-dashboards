import { Button } from 'antd';
import React from 'react';
import { ButtonHTMLType } from 'antd/es/button/button';
import { css } from 'emotion';

const Styling = {
  button: css`
    color: white !important;
    background-color: #212327 !important;
    border-radius: 0px !important;
    border: 1px solid #212327 !important;
    height: 36px !important;
  `,
};
interface ButtonElementInterface {
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: any) => void;
  text: string;
  htmlType?: ButtonHTMLType;
}

const ButtonElement = ({
  loading = false,
  disabled = false,
  onClick,
  text,
  htmlType = 'submit',
}: ButtonElementInterface) => {
  return (
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
};

export default ButtonElement;

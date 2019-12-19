import { Button } from 'antd';
import React from 'react';
import './Button.scss';
import { ButtonHTMLType } from 'antd/es/button/button';

interface ButtonElementInterface {
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: any) => void;
  text: string;
  htmlType?: ButtonHTMLType;
}

const ButtonElement = ({ loading = false, disabled = false, onClick, text, htmlType = 'submit' }: ButtonElementInterface) => {
  return (
    <Button
      onClick={onClick || (() => {})}
      type="primary"
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      className="instance-id-submit-button"
    >
      {text}
    </Button>
  );
};

export default ButtonElement;

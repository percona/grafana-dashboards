import { Button } from 'antd';
import React from 'react';
import './Button.scss';
const ButtonElement = ({ type = 'primary', loading = false, disabled = false, onClick, text, htmlType = 'submit' }) => {
  return (
    <Button onClick={() => {}} type="primary" htmlType={htmlType} loading={loading} disabled={disabled} className="instance-id-submit-button">
      {text}
    </Button>
  );
};

export default ButtonElement;

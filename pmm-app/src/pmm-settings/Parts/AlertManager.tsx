import { VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea';
import React from 'react';
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';

const AlertManager = props => {
  return (
    <>
      <VerticalFormWrapper label={'AlertManager IP'} element={<InputField placeholder="Enter IP" style={{ width: '100%' }} />} />
      <VerticalFormWrapper label={'AlertManager rules'} element={<TextAreaField placeholder="Alert manager rule" style={{ width: '100%' }} />} />
      <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
        Apply AlertManager settings
      </button>
    </>
  );
};

export default PanelForm({ Element: AlertManager });

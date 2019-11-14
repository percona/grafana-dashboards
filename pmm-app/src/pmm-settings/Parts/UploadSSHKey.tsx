import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea';
import React from 'react';
import PanelForm from '../../react-plugins-deps/components/helpers/PanelForm';

const UploadSSHKey = props => {
  // @ts-ignore
  return (
    <>
      <VerticalFormWrapper
        label={'SSH key'}
        tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'Public SSH key to let you login into the server using SSH.'} />}
        element={<TextAreaField placeholder="Enter ssh key" style={{ width: '100%' }} />}
      />
      <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
        Apply SSH key
      </button>
    </>
  );
};

export default PanelForm({ Element: UploadSSHKey });

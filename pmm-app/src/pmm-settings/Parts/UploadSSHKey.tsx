import { PluginTooltip, VerticalFormWrapper } from '../../react-plugins-deps/components/helpers/Helpers';
import { TextAreaField } from '../../react-plugins-deps/components/FieldsComponents/TextArea';
import React, { ReactElement } from 'react';
import { Form as FormFinal } from 'react-final-form';
// import { useForm } from 'react-final-form-hooks';

const UploadSSHKey = props => {
  // @ts-ignore
  return (
    <FormFinal
      onSubmit={() => {}}
      validate={() => {
        return undefined;
      }}
      render={(): ReactElement => {
        // const { form } = useForm({
        //   onSubmit: () => {},
        //   validate: () => {},
        // });
        // @ts-ignore
        return (
          <form>
            <VerticalFormWrapper
              label={'SSH key'}
              tooltip={<PluginTooltip linkText={'Read more'} url={'#'} text={'Public SSH key to let you login into the server using SSH.'} />}
              element={<TextAreaField placeholder="Enter ssh key" style={{ width: '100%' }} />}
            />
            <button type="submit" className="button button--dark" id="addInstance" style={{ color: 'white' }}>
              Apply SSH key
            </button>
          </form>
        );
      }}
    />
  );
};

export default UploadSSHKey;

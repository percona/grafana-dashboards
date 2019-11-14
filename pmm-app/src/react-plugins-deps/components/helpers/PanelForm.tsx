import React, { ReactElement } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';

const PanelForm = ({ Element }) => props => {
  return (
    <FormFinal
      onSubmit={() => {}}
      validate={() => {
        return undefined;
      }}
      render={(): ReactElement => {
        const { form } = useForm({
          onSubmit: () => {},
          validate: () => {},
        });
        // @ts-ignore
        return (
          <form>
            <Element form={form} {...props} />
          </form>
        );
      }}
    />
  );
};

export default PanelForm;

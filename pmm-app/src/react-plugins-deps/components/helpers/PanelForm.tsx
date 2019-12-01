import React, { ReactElement, useState } from 'react';
import { Form as FormFinal } from 'react-final-form';
import { useForm } from 'react-final-form-hooks';

const PanelForm = ({ Element, onSubmit, validate }) => props => {
  const [loading, setLoading] = useState(false);

  return (
    <FormFinal
      onSubmit={() => {}}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: values => {
            onSubmit(values, setLoading);
          },
          validate: validate,
        });
        // @ts-ignore
        return (
          <form onSubmit={handleSubmit}>
            <Element form={form} {...props} loading={loading} />
          </form>
        );
      }}
    />
  );
};

export default PanelForm;

import { Form as FormFinal } from 'react-final-form';
import React, { ReactElement } from 'react';
import { useForm } from 'react-final-form-hooks';
import { InputField } from '../../react-plugins-deps/components/FieldsComponents/Input/Input';

const Search = props => {
  return (
    <FormFinal
      onSubmit={values => {
        // debugger;
        // setCredentials()
      }}
      validate={() => {
        return undefined;
      }}
      render={(): ReactElement => {
        const { form, handleSubmit } = useForm({
          onSubmit: values => {
            props.setCredentials(values);
            console.log(values);
          },
          // validate: () => {},
        });

        return (
          <form onSubmit={handleSubmit} className="discovery-instance-form app-theme-dark">
            <div className="discovery-search-panel">
              <InputField
                form={form}
                name="aws_access_key"
                data-cy="add-account-username"
                placeholder="AMAZON_RDS_ACCESS_KEY_ID"
                required={true}
                wrapperStyle={{ paddingRight: '10px' }}
              />
              <InputField
                form={form}
                name="aws_secret_key"
                data-cy="add-account-username"
                placeholder="AMAZON_RDS_SECRET_ACCESS_KEY"
                required={true}
                wrapperStyle={{ paddingRight: '10px' }}
              />
              <button className="button button--dark" id="addInstance">
                Discover
              </button>
            </div>
            <div>
              <a href="#">Where do i get the security credentials for my amazon RDS DB instance</a>
            </div>
          </form>
        );
      }}
    />
  );
};

export default Search;

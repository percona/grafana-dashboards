import React, {Component, ReactElement} from "react";
import "./AddRemoteInstance.scss";
import { InputField } from "../../../react-plugins-deps/components/fields-components/Input";
import { TextAreaField } from "../../../react-plugins-deps/components/fields-components/TextArea";
import { CheckboxField } from "../../../react-plugins-deps/components/fields-components/Checkbox";

import { Form as FormFinal } from "react-final-form";

class AddRemoteInstance extends Component {
  render() {
    // @ts-ignore
    return (
      <FormFinal
        onSubmit={() => {}}
        validate={() => {return undefined}}
        render={({ handleSubmit }): ReactElement => (
          <form className="add-instance-form app-theme-dark">
            <div className="add-instance-panel">
              <h6>Main details</h6>
              <span></span>
              <InputField
                name="Hostname"
                data-cy="add-account-username"
                placeholder="*Hostname"
                required={true}
              />
              <span className="description">
                Public DNS hostname of your instance
              </span>

              <InputField
                name="Hostname"
                data-cy="add-account-username"
                placeholder="Service name (default: Hostname)"
                required={true}

              />
              <span className="description">Service name to use.</span>

              <InputField
                name="Port"
                data-cy="add-account-username"
                placeholder="Port (default: + defaultPort"
                required={true}

              />
              <span className="description">
                Port your service is listening on
              </span>

              <InputField
                name="email"
                data-cy="add-account-username"
                placeholder="*Username"
                required={true}

              />
              <span className="description">Your database user name</span>

              <InputField
                name="email"
                data-cy="add-account-username"
                placeholder="*Password"
                required={true}

              />
              <span className="description">Your database password</span>
            </div>
            <div className="add-instance-panel">
              <h6>Labels</h6>
              <span></span>
              <InputField
                name="email"
                data-cy="add-account-username"
                placeholder="Email"
                required={true}

              />
              <span className="description">
                Public DNS hostname of your instance
              </span>

              <InputField
                name="email"
                data-cy="add-account-username"
                placeholder="Email"
                required={true}

              />
              <span className="description">Service name to use.</span>

              <InputField
                name="email"
                data-cy="add-account-username"
                placeholder="Email"
                required={true}

              />
              <span className="description">
                Port your service is listening on
              </span>

              <TextAreaField
                name="email"
                data-cy="add-account-username"
                placeholder="Email"
              />
              <span className="description">Your database user name</span>
            </div>
            <div className="add-instance-panel">
              <h6>Additional options</h6>
              <span></span>
              <div>
                <CheckboxField
                  name="email"
                  data-cy="add-account-username"
                />
                <label className="description" htmlFor="skip_connection_check">
                  Skip connection check
                </label>
              </div>
              <span className="description"></span>
              <div>
                <CheckboxField
                  name="email"
                  data-cy="add-account-username"
                />
                <label className="description" htmlFor="tls">
                  Use TLS for database connections.
                </label>
              </div>
              <span className="description"></span>
              <div>
                <CheckboxField
                  name="email"
                  data-cy="add-account-username"
                />
                <label className="description" htmlFor="tls_skip_verify">
                  Skip TLS certificate and hostname validation
                </label>
              </div>
              <span className="description"></span>
            </div>

            <div className="add-instance-form__submit-block">
              <button
                type="submit"
                className="button button--dark"
                id="addInstance"
              >
                Add service
              </button>

              <div className="spinner-wrapper">
                <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}

export default AddRemoteInstance;

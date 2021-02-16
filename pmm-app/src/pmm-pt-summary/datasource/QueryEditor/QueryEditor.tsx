import React, { useEffect, useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Select, Field, FieldSet } from '@grafana/ui';
import { getTemplateSrv } from '@grafana/runtime';
import { Messages } from './QueryEditor.messages';

export const QueryEditor = (props) => {
  const { query } = props;
  const [variableSelectedValue, setVariableName] = useState<SelectableValue<string>>(query.queryType);

  useEffect(() => {
    props.onChange({
      queryType: { variableName: variableSelectedValue?.value },
    });
  }, [variableSelectedValue]);

  const variablesOptions = getTemplateSrv()
    .getVariables()
    .map((variable) => ({ value: variable.name, label: variable.label || undefined }));

  return (
    <>
      <div className="gf-form">
        <FieldSet>
          <Field label={Messages.labels.field.variableName}>
            <Select options={variablesOptions} value={variableSelectedValue} onChange={setVariableName} />
          </Field>
        </FieldSet>
      </div>
    </>
  );
};

export default QueryEditor;

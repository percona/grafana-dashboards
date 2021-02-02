import React, { useEffect, useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Select, Field, FieldSet } from '@grafana/ui';
import { getTemplateSrv } from '@grafana/runtime';
import { DATASOURCE_OPTIONS } from './ConfigEditor.constants';
import { Messages } from './ConfigEditor.messages';

export const QueryEditor = (props) => {
  const {
    query: {
      queryType: { queryType, variableName },
    },
  } = props;

  const [queryTypeSelectedValue, setQueryType] = useState<SelectableValue<string>>(
    queryType || DATASOURCE_OPTIONS[0],
  );
  const [variableNameSelectedValue, setVariableName] = useState<SelectableValue<string>>(variableName);

  useEffect(() => {
    props.onChange({
      queryType: { queryType: queryTypeSelectedValue.value, variableName: variableNameSelectedValue.value },
    });
  }, [queryTypeSelectedValue, variableNameSelectedValue]);

  const variablesOptions = getTemplateSrv()
    .getVariables()
    .map((variable) => ({ value: variable.name, label: variable.label || undefined }));

  return (
    <>
      <div className="gf-form">
        <FieldSet>
          <Field label={Messages.labels.field.datasourceType}>
            <Select options={DATASOURCE_OPTIONS} value={queryTypeSelectedValue} onChange={setQueryType} />
          </Field>
          <Field label={Messages.labels.field.variableName}>
            <Select options={variablesOptions} value={variableNameSelectedValue} onChange={setVariableName} />
          </Field>
        </FieldSet>
      </div>
    </>
  );
};

export default QueryEditor;

import React, { useEffect, useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Select, Field, FieldSet } from '@grafana/ui';
import { getTemplateSrv } from '@grafana/runtime';
import { Messages } from './QueryEditor.messages';
import { DATASOURCES } from './QueryEditor.constants';

export const QueryEditor = (props) => {
  const { query: { queryType } } = props;

  const variablesOptions = getTemplateSrv()
    .getVariables()
    .map((variable) => ({ value: variable.name, label: variable.label || undefined }));

  const selectedOption = variablesOptions.find((variable) => variable.value === queryType?.variableName);
  const selectedTypeOption = DATASOURCES.find((datasource) => datasource.value === queryType?.type);

  const [selectedVariable, selectVariable] = useState<SelectableValue<string> | undefined>(selectedOption);
  const [type, setType] = useState<SelectableValue<string>>(selectedTypeOption || DATASOURCES[0]);

  useEffect(() => {
    const newQuery = { ...queryType };

    if (selectedVariable?.value) {
      newQuery.variableName = selectedVariable?.value;
    }

    if (type?.value) {
      newQuery.type = type?.value;
    }

    props.onChange({
      queryType: newQuery,
    });
  }, [selectedVariable, type]);


  return (
    <>
      <div className="gf-form">
        <FieldSet>
          <Field label={Messages.labels.field.datasourceType}>
            <Select options={DATASOURCES} value={selectedTypeOption} onChange={setType} />
          </Field>
          <Field label={Messages.labels.field.variableName}>
            <Select options={variablesOptions} value={selectedOption} onChange={selectVariable} />
          </Field>
        </FieldSet>
      </div>
    </>
  );
};

export default QueryEditor;

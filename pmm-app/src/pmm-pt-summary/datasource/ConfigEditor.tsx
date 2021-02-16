import React from 'react';
import { Field, FieldSet, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { DATASOURCES } from './QueryEditor/QueryEditor.constants';
import { Messages } from './QueryEditor/QueryEditor.messages';

export const ConfigEditor = (props) => {
  const { onOptionsChange, options } = props;

  const onQueryTypeChange = ({ value }: SelectableValue) => {
    const jsonData = {
      ...options.jsonData,
      queryType: value,
    };

    onOptionsChange({ ...options, jsonData });
  };

  return (
    <>
      <div className="gf-form">
        <FieldSet>
          <Field label={Messages.labels.field.datasourceType}>
            <Select options={DATASOURCES} value={options.jsonData?.queryType} onChange={onQueryTypeChange} />
          </Field>
        </FieldSet>
      </div>
    </>
  );
};

export default ConfigEditor;

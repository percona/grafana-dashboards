import React, { useEffect, useState } from 'react';
import { SelectableValue } from '@grafana/data';
import { Select } from '@grafana/ui';
import { DATASOURCE_OPTIONS } from './ConfigEditor.constants';

export const QueryEditor = (props) => {
  const [value, setValue] = useState<SelectableValue<string>>(DATASOURCE_OPTIONS[0]);

  useEffect(() => {
    props.onChange({ queryType: value.value });
  }, [value]);

  return (
    <>
      <div className="gf-form">
        <Select options={DATASOURCE_OPTIONS} value={value} onChange={setValue} />
      </div>
    </>
  );
};

export default QueryEditor;

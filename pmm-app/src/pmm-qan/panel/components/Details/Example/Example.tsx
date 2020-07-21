import React, { FC } from 'react';
import { Spin } from 'antd';
import { Databases } from '../Details.constants';
import { getExample } from './Example.tools';
import { ExampleInterface } from './Example.types';

const Example: FC<ExampleInterface> = ({
  fingerprint,
  databaseType,
  examples,
  loading
}) => {
  const isExample = examples && examples.filter((example) => example.example).length;
  const isPostgresql = databaseType === Databases.postgresql;

  return (
    <Spin spinning={loading}>
      {isPostgresql && fingerprint ? getExample(databaseType)(fingerprint) : null}
      {!isPostgresql && isExample
        ? examples
          .filter((example) => example.example)
          .map((example) => example.example)
          .map(getExample(databaseType))
        : null}
      {/* eslint-disable-next-line max-len */}
      {(!isPostgresql && !isExample) || (isPostgresql && !fingerprint) ? <pre>Sorry, no examples found for this query</pre> : null}
    </Spin>
  );
};

export default Example;

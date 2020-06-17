import React, { FC } from 'react';
import { DATABASE } from '../Details.constants';
import { getExample } from './Example.tools';
import { ExampleInterface } from './Example.types';

const Example: FC<ExampleInterface> = ({ fingerprint, databaseType, examples }) => {
  const isExample = examples && examples.filter((example) => example.example).length;
  const isPostgresql = databaseType === DATABASE.postgresql;

  return (
    <div>
      {isPostgresql && fingerprint ? getExample(databaseType)(fingerprint) : null}
      {!isPostgresql && isExample
        ? examples
          .filter((example) => example.example)
          .map((example) => example.example)
          .map(getExample(databaseType))
        : null}
      {/* eslint-disable-next-line max-len */}
      {(!isPostgresql && !isExample) || (isPostgresql && !fingerprint) ? <pre>Sorry, no examples found for this query</pre> : null}
    </div>
  );
};

export default Example;

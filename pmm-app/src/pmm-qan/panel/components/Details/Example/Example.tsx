import React, { FC } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { getExample } from './Example.tools';
import { ExampleInterface } from './Example.types';
import { Messages } from '../Details.messages';
import { Databases } from '../Details.types';

const Example: FC<ExampleInterface> = ({
  fingerprint, databaseType, examples, loading,
}) => {
  const isExample = examples && examples.filter((example) => example.example).length;
  const isPostgresql = databaseType === Databases.postgresql;

  return (
    <Overlay isPending={loading} size={35}>
      {isPostgresql && fingerprint && !loading ? getExample(databaseType)(fingerprint) : null}
      {!isPostgresql && isExample && !loading
        ? examples
          .filter(({ example }) => example)
          .map(({ example }) => example)
          .map(getExample(databaseType))
        : null}
      {(!isPostgresql && !isExample) || (isPostgresql && !fingerprint) ? (
        <pre>{Messages.noExamplesFound}</pre>
      ) : null}
    </Overlay>
  );
};

export default Example;

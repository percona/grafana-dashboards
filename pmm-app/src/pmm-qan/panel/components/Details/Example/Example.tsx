import React, { FC } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { getExample } from './Example.tools';
import { ExampleInterface } from './Example.types';
import { Messages } from '../Details.messages';
import { OVERLAY_LOADER_SIZE } from '../Details.constants';

const Example: FC<ExampleInterface> = ({ databaseType, examples, loading }) => {
  const isExample = examples && examples.filter((example) => example.example).length;

  return (
    <Overlay isPending={loading} size={OVERLAY_LOADER_SIZE}>
      {isExample && !loading
        ? examples
          .filter(({ example }) => example)
          .map(({ example }) => example)
          .map(getExample(databaseType))
        : null}
      {!isExample ? <pre>{Messages.noExamplesFound}</pre> : null}
    </Overlay>
  );
};

export default Example;

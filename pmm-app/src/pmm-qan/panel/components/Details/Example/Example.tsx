import React, { FC } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { extractExample, getExample } from './Example.tools';
import { ExampleInterface } from './Example.types';
import { Messages } from '../Details.messages';
import { OVERLAY_LOADER_SIZE } from '../Details.constants';

const Example: FC<ExampleInterface> = ({ databaseType, examples, loading }) => {
  const isExample = examples && examples.filter(extractExample).length;
  const examplesList = examples.map(extractExample).filter(Boolean).map(getExample(databaseType));

  return (
    <Overlay isPending={loading} size={OVERLAY_LOADER_SIZE}>
      {isExample && !loading ? examplesList : null}
      {!isExample ? <pre>{Messages.noExamplesFound}</pre> : null}
    </Overlay>
  );
};

export default Example;

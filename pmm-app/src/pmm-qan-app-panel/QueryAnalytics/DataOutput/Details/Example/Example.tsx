import React from 'react';
import Highlight from 'react-highlight.js';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';
import { useExamples } from './Example.hooks';
import { useDatabaseType } from '../Details.hooks';
import { DATABASE } from '../Details.constants';

const getExample = databaseType => (example: any): any => {
  if (databaseType === DATABASE.mongodb) {
    return <ReactJSON json={JSON.parse(example.example)} />;
  }

  return <Highlight language="sql">{example.example}</Highlight>;
};

const Example = () => {
  const [examples] = useExamples();
  const databaseType = useDatabaseType();

  return (
    <div>
      {examples && examples.length
        ? examples.map(getExample(databaseType))
        : 'Sorry, no examples found for this query'}
    </div>
  );
};

export default Example;

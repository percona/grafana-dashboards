import React from 'react';
import Highlight from 'react-highlight.js';
import { ReactJSON } from '../../../../react-plugins-deps/components/Elements/ReactJSON/ReactJSON';
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
      {examples && examples.filter(example => example.example).length ? (
        examples.filter(example => example.example).map(getExample(databaseType))
      ) : (
        <pre>Sorry, no examples found for this query</pre>
      )}
    </div>
  );
};

export default Example;

import React, { useEffect, useState } from 'react';
import ExampleService from './Example.service';
import Highlight from 'react-highlight.js';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';

const getExample = databaseType => (example: string): any => {
  if (databaseType === 'mongodb') {
    return <ReactJSON json={JSON.parse(example)} />;
  }

  return <Highlight language="sql">{example}</Highlight>;
};

const Example = props => {
  const { queryId, groupBy, from, to, labels, tables, databaseType } = props;
  const [examples, setExamples] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables,
        });
        setExamples(result['query_examples'].map(example => example.example).filter(Boolean));
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return (
    <div>
      {examples && examples.length
        ? examples.map(getExample(databaseType))
        : 'Sorry, no examples found for this query'}
    </div>
  );
};

export default Example;

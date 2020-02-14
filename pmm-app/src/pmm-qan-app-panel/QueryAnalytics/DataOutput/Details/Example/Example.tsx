import React, { useEffect, useState } from 'react';
import ExampleService from './Example.service';
import { ReactJSON } from '../../../../../react-plugins-deps/components/ReactJSON/ReactJSON';

const getJSONExample = example => <ReactJSON json={example} />;

const Example = props => {
  const { queryId, groupBy, from, to, labels, tables } = props;
  const [examples, setExamples] = useState([]);
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
        setExamples(result['query_examples']);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return <div>{examples && examples.length && examples.map(getJSONExample)}</div>;
};

export default Example;

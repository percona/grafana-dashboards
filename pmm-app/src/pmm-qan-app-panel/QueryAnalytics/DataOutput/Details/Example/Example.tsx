import React, { useEffect, useState } from 'react';
import ExampleService from './Example.service';
import ReactJson from 'react-json-view';

const THEME_JSON_VIEW = {
  base00: 'transparent',
  base01: 'transparent',
  base02: 'lightgray',
  base03: '#bfbfbf',
  base04: '#1890ff',
  base05: '#bfbfbf',
  base06: '#bfbfbf',
  base07: '#bfbfbf',
  base08: '#bfbfbf',
  base09: 'white',
  base0A: 'white',
  base0B: 'white',
  base0C: 'white',
  base0D: 'white',
  base0E: 'white',
  base0F: 'white',
};

const getJSONExample = example => <ReactJson src={example} theme={THEME_JSON_VIEW} />;

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

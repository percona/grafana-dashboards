import React, { useEffect, useState } from 'react';
import ExampleService from './Example.service';
import ReactJson from 'react-json-view';

// const getSQLExample = example => {};
//
const getJSONExample = example => (
  <ReactJson
    src={example}
    theme={{
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
    }}
  />
);
const Example = props => {
  const { queryId, groupBy, periodStartFrom, periodStartTo, labels, tables } = props;
  const [examples, setExamples] = useState([]);
  useEffect(() => {
    const getExamples = async () => {
      const result = await ExampleService.getExample({
        filterBy: queryId,
        groupBy: groupBy,
        periodStartFrom: periodStartFrom,
        periodStartTo: periodStartTo,
        labels: labels,
        tables: tables,
      });
      setExamples(result['query_examples']);
    };
    getExamples();
  }, [queryId]);

  return <div>{examples.length && examples.map(example => getJSONExample(example))}</div>;
};

export default Example;

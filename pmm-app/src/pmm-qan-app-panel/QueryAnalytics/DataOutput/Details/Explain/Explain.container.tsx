import * as React from 'react';
import { useEffect, useState } from 'react';
import Explain from './Explain';
import ExplainService from './Explain.service';
import ExampleService from '../Example/Example.service';

const ExplainContainer = props => {
  const { queryId, groupBy, from, to, labels, tables,databaseType } = props;
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState({});
  const [errorText, setErrorText] = useState('');
  const [example, setExample] = useState({});

  const startExplainActions = example => {
    switch (databaseType) {
      case 'mysql':
        console.log('Example: ', example);
        if (!('example' in example) || example.example === '') {
          setErrorText('Cannot display query explain without query example at this time.');
          return;
        }
        setErrorText('');
        getExplain(example);
        break;
      default:
        setErrorText('Not implemented yet :(');
        return;
    }
  };

  const getExplain = example => {
    (async () => {
      try {
        const { action_id } = await ExplainService.getTraditionalExplain({
          database: example.schema,
          query: example.example,
          service_id: example.service_id,
        });
        const explain = await ExplainService.getActionResult({
          action_id,
        });
        setTraditionalExplain(explain.output);
      } catch (e) {
        //TODO: add error handling
      }
    })();

    (async () => {
      try {
        const { action_id } = await ExplainService.getTraditionalExplainJSON({
          database: example.schema,
          query: example.example,
          service_id: example.service_id,
        });
        const explain = await ExplainService.getActionResult({
          action_id,
        });
        setJsonExplain(JSON.parse(explain.output));
      } catch (e) {
        //TODO: add error handling
      }
    })();
  };

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
        const queryExample = result['query_examples'][0];
        setExample(queryExample);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  useEffect(() => {
    startExplainActions(example);
  }, [example]);

  return errorText || <Explain json={jsonExplain} classic={traditionalExplain} />;
};

export default ExplainContainer;

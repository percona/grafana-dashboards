import * as React from 'react';
import { useEffect, useState } from 'react';
import Explain from './Explain';
import ExplainService from './Explain.service';
import ExampleService from '../Example/Example.service';

const ExplainContainer = props => {
  const { queryId, groupBy, from, to, labels, tables, databaseType } = props;
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState({});
  const [errorText, setErrorText] = useState('');
  const [example, setExample] = useState({});

  const startExplainActions = example => {
    if (!('example' in example) || example.example === '') {
      setErrorText('Cannot display query explain without query example at this time.');
      return;
    }

    switch (databaseType) {
      case 'mysql':
        setErrorText('');
        getMysqlExplain(example);
        break;
      case 'mongo':
        setErrorText('');
        getMongoExplain(example);
        break;
      default:
        setErrorText('Not implemented yet :(');
        return;
    }
  };

  const getMongoExplain = example => {
    (async () => {
      try {
        const { action_id } = await ExplainService.getTraditionalExplainJSONMongo({
          pmm_agent_id: example.pmm_agent_id,
          service_id: example.service_id,
          query: example.example,
        });
        const explain = await ExplainService.getActionResult({
          action_id,
        });
        setJsonExplain(explain.output);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  };

  const getMysqlExplain = example => {
    (async () => {
      try {
        const { action_id } = await ExplainService.getTraditionalExplainMysql({
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
        const { action_id } = await ExplainService.getTraditionalExplainJSONMysql({
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

  return errorText ? <pre>{errorText}</pre> : <Explain json={jsonExplain} classic={traditionalExplain} />;
};

export default ExplainContainer;

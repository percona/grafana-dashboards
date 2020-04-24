import ExplainService from './Explain.service';
import { useEffect, useState } from 'react';
import { useDatabaseType } from '../Details.hooks';
import { useExamples } from '../Example/Example.hooks';
import { DATABASE } from '../Details.constants';

export const useExplain = (): [any, any, boolean, string] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [traditionalExplain, setTraditionalExplain] = useState(null);
  const [jsonExplain, setJsonExplain] = useState({});
  const [errorText, setErrorText] = useState('');
  const databaseType = useDatabaseType();
  const [examples] = useExamples();

  const startExplainActions = example => {
    if (!('example' in example) || example.example === '') {
      setErrorText('Cannot display query explain without query example at this time.');
      return;
    }
    switch (databaseType) {
      case DATABASE.mysql:
        setErrorText('');
        getMysqlExplain(example);
        break;
      case DATABASE.mongodb:
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
        setLoading(true);
        const { action_id } = await ExplainService.getTraditionalExplainJSONMongo({
          pmm_agent_id: example.pmm_agent_id,
          service_id: example.service_id,
          query: example.example,
        });
        const explain = await ExplainService.getActionResult({
          action_id,
        });
        setJsonExplain(explain.output);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();
  };

  const getMysqlExplain = example => {
    setLoading(true);
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
        setLoading(false);
      } catch (e) {
        setLoading(false);

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
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();
  };

  useEffect(() => {
    const notEmptyExample = examples.filter(example => example.example);
    if (!notEmptyExample.length || !databaseType) {
      return;
    }
    startExplainActions(notEmptyExample);
  }, [examples, databaseType]);

  return [jsonExplain, traditionalExplain, loading, errorText];
};

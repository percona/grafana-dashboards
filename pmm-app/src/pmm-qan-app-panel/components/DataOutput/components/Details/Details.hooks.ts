import { useContext, useEffect, useState } from 'react';
import { PanelProvider } from '../../../../panel/panel.provider';
import { DetailsProvider } from './Details.provider';
import { DATABASE } from './Details.constants';
import { get } from 'lodash';
import DetailsService from './Details.service';

export const useActionResult = (): [any, any] => {
  const [result, setResult] = useState<any>();
  const [action_id, setActionId] = useState<any>();
  let intervalId;
  useEffect(() => {
    if (!action_id) {
      return;
    }
    const getData = async () => {
      const result = await DetailsService.getActionResult({
        action_id,
      });
      if (result.done) {
        clearInterval(intervalId);
        setResult(result.output);
      }
    };
    intervalId = setInterval(getData, 300);
  }, [action_id]);

  return [result, setActionId];
};

export const useExplain = (): [any, any, boolean, string] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState('');
  const {
    detailsState: { databaseType, examples },
  } = useContext(DetailsProvider);
  const [traditionalExplain, setActionIdTraditional] = useActionResult();
  const [jsonExplain, setActionIdJSON] = useActionResult();
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
        const { action_id } = await DetailsService.getTraditionalExplainJSONMongo({
          pmm_agent_id: example.pmm_agent_id,
          service_id: example.service_id,
          query: example.example,
        });
        setActionIdJSON(action_id);
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
        const { action_id } = await DetailsService.getTraditionalExplainMysql({
          database: example.schema,
          query: example.example,
          service_id: example.service_id,
        });
        setActionIdTraditional(action_id);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();

    (async () => {
      try {
        const { action_id } = await DetailsService.getTraditionalExplainJSONMysql({
          database: example.schema,
          query: example.example,
          service_id: example.service_id,
        });
        setActionIdJSON(action_id);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();
  };

  useEffect(() => {
    if (!examples) {
      return;
    }

    const notEmptyExample = examples.filter(example => example.example);
    if (!notEmptyExample.length || !databaseType) {
      return;
    }

    startExplainActions(notEmptyExample[0]);
  }, [examples, databaseType]);

  return [jsonExplain, traditionalExplain, loading, errorText];
};

export const useDetailsState = () => {
  const {
    panelState: { queryId, groupBy, from, to, labels },
  } = useContext(PanelProvider);
  const {
    detailsState: { databaseType, examples },
    contextActions,
  } = useContext(DetailsProvider);
  const [jsonExplain, traditionalExplain] = useExplain();
  useEffect(() => {
    (async () => {
      try {
        const result = await DetailsService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels: labels,
          tables: [],
        });
        contextActions.setExamples(result['query_examples']);
        contextActions.setDatabaseType(result['query_examples'][0].service_type);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  useEffect(() => {
    if (!jsonExplain) {
      return;
    }

    if (databaseType === DATABASE.mysql) {
      const parsedJSON = JSON.parse(jsonExplain);
      contextActions.setTables([
        get(parsedJSON, 'query_block.table.table_name') ||
          get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
      ]);
    }
  }, [jsonExplain]);

  useEffect(() => {
    if (databaseType === DATABASE.postgresql && examples) {
      contextActions.setTables(examples[0].tables);
    }
  }, [examples, databaseType]);

  useEffect(() => {
    contextActions.setExplainJSON(jsonExplain);
    contextActions.setExplainClassic(traditionalExplain);
  }, [jsonExplain, traditionalExplain]);
};

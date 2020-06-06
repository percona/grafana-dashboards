import {
  Dispatch, useContext, useEffect, useState
} from 'react';
import { get } from 'lodash';
import { QueryAnalyticsProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import { DetailsProvider } from './Details.provider';
import { DATABASE } from './Details.constants';
import DetailsService from './Details.service';
import { databaseFactory } from './database-models';

interface ActionResult {
  value: any;
  loading: boolean;
  error: string;
}
export const useActionResult = (): [ActionResult, Dispatch<string>] => {
  const [result, setResult] = useState<any>();
  const [actionId, setActionId] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  let intervalId;
  // 5 seconds
  let counter = 10;
  useEffect(() => {
    if (!actionId) {
      return;
    }
    const getData = async () => {
      if (!counter) {
        clearInterval(intervalId);
        setLoading(false);
        return;
      }
      counter -= 1;

      try {
        const requestResult = await DetailsService.getActionResult({
          action_id: actionId,
        });
        if (requestResult.done) {
          setLoading(false);
          clearInterval(intervalId);
          if (requestResult.error) {
            setError(requestResult.error);
          } else {
            setError('');
            setResult(requestResult.output);
          }
        }
      } catch (e) {
        clearInterval(intervalId);
        setLoading(false);
      }
    };
    intervalId = setInterval(getData, 500);
  }, [actionId]);

  return [{ value: result, loading, error }, setActionId];
};

export const useExplain = (): [any, any, string] => {
  const [errorText, setErrorText] = useState('');
  const {
    detailsState: { databaseType, examples },
  } = useContext(DetailsProvider);
  const [traditionalExplain, setActionIdTraditional] = useActionResult();
  const [jsonExplain, setActionIdJSON] = useActionResult();

  useEffect(() => {
    if (!examples) {
      return;
    }

    const notEmptyExample = examples.filter((example) => example.example);
    if (!notEmptyExample.length || !databaseType) {
      return;
    }
    const database = databaseFactory(databaseType);
    database.getExplains({
      example: notEmptyExample[0],
      setActionIdTraditional,
      setActionIdJSON,
      setErrorText,
    });
  }, [examples, databaseType]);

  return [jsonExplain, traditionalExplain, errorText];
};

export const useDetailsState = () => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels
    },
  } = useContext(QueryAnalyticsProvider);
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
          labels,
          tables: [],
        });
        contextActions.setExamples(result.query_examples);
        contextActions.setDatabaseType(result.query_examples[0].service_type);
      } catch (e) {
        // TODO: add error handling
      }
    })();
  }, [queryId]);

  useEffect(() => {
    if (databaseType === DATABASE.mysql && jsonExplain.value) {
      const parsedJSON = JSON.parse(jsonExplain.value);
      contextActions.setTables(
        [
          get(parsedJSON, 'query_block.table.table_name')
            || get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
        ].filter(Boolean)
      );
    }

    if (databaseType === DATABASE.postgresql && examples) {
      contextActions.setTables(examples[0].tables || []);
    }
  }, [examples, jsonExplain.value, databaseType]);

  useEffect(() => {
    contextActions.setExplainJSON(jsonExplain);
  }, [jsonExplain.value, jsonExplain.loading, jsonExplain.error]);

  useEffect(() => {
    contextActions.setExplainClassic(traditionalExplain);
  }, [traditionalExplain.value, traditionalExplain.loading, traditionalExplain.error]);
};

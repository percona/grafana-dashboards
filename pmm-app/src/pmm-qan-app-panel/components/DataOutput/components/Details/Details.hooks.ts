import { Dispatch, useContext, useEffect, useState } from 'react';
import { PanelProvider } from '../../../../panel/panel.provider';
import { DetailsProvider } from './Details.provider';
import { DATABASE } from './Details.constants';
import { get } from 'lodash';
import DetailsService from './Details.service';
import { databaseFactory } from './database-models';

interface ActionResult {
  value: any;
  loading: boolean;
  error: string;
}
export const useActionResult = (): [ActionResult, Dispatch<string>] => {
  const [result, setResult] = useState<any>();
  const [action_id, setActionId] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  let intervalId;
  // 9 seconds, long enough
  let counter = 30;
  useEffect(() => {
    if (!action_id) {
      return;
    }
    const getData = async () => {
      if (counter === 0) {
        clearInterval(intervalId);
        setLoading(false);
        return;
      }
      counter--;

      try {
        const result = await DetailsService.getActionResult({
          action_id: action_id,
        });
        if (result.done) {
          setLoading(false);
          clearInterval(intervalId);

          if (result.error) {
            setError(result.error);
          } else {
            setError('');
            setResult(result.output);
          }
        }
      } catch (e) {
        clearInterval(intervalId);
        setLoading(false);
      }
    };
    intervalId = setInterval(getData, 300);
  }, [action_id]);

  return [{ value: result, loading: loading, error: error }, setActionId];
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

    const notEmptyExample = examples.filter(example => example.example);
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
    if (databaseType === DATABASE.mysql && jsonExplain.value) {
      const parsedJSON = JSON.parse(jsonExplain.value);
      contextActions.setTables(
        [
          get(parsedJSON, 'query_block.table.table_name') ||
            get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
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

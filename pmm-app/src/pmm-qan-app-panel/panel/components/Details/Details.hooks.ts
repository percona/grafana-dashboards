import { useContext, useEffect } from 'react';
import { get } from 'lodash';
import { QueryAnalyticsProvider } from 'pmm-qan-app-panel/panel/panel.provider';
import { DetailsProvider } from './Details.provider';
import { DATABASE } from './Details.constants';
import DetailsService from './Details.service';
import Mysql from './database-models/mysql';
import Mongodb from "./database-models/mongodb";

interface ActionResult {
  value: any;
  loading: boolean;
  error: string;
}
export const useActionResult = async (actionId): Promise<ActionResult> => {
  let intervalId;
  // 5 seconds
  let counter = 10;

  return new Promise((resolve) => {
    if (!actionId) {
      return;
    }
    const getData = async () => {
      if (!counter) {
        clearInterval(intervalId);
        resolve({
          loading: false,
          value: null,
          error: '',
        });
        return;
      }
      counter -= 1;

      try {
        const requestResult = await DetailsService.getActionResult({
          action_id: actionId,
        });
        if (requestResult.done) {
          // setLoading(false);
          clearInterval(intervalId);
          if (requestResult.error) {
            // setError(requestResult.error);
            resolve({
              loading: false,
              value: null,
              error: requestResult.error,
            });
          } else {
            resolve({
              loading: false,
              value: requestResult.output,
              error: '',
            });
            // setError('');
            // setResult(requestResult.output);
          }
        }
      } catch (e) {
        clearInterval(intervalId);
        // setLoading(false);
        resolve({
          loading: false,
          value: null,
          error: '',
        });
      }
    };
    intervalId = setInterval(getData, 500);
  });
};

export const useDetailsState = () => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels
    },
  } = useContext(QueryAnalyticsProvider);
  const {
    contextActions,
  } = useContext(DetailsProvider);
  useEffect(() => {
    (async () => {
      try {
        // 1. Get examples, we need it to get all addditional data
        const result = await DetailsService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          tables: [],
        });
        const examples = result.query_examples;
        const databaseType = result.query_examples[0].service_type;

        const notEmptyExample = examples.filter((example) => example.example);

        let jsonExplain;
        let traditionalExplain;
        // 2. Get explains
        if (databaseType === DATABASE.mysql) {
          const traditionalExplainActionId = await Mysql.getExplainTraditional({
            example: notEmptyExample[0],
          });
          const jsonExplainActionId = await Mysql.getExplainJSON({ example: notEmptyExample[0] });

          jsonExplain = await useActionResult(jsonExplainActionId);
          traditionalExplain = await useActionResult(traditionalExplainActionId);
        } else if (databaseType === DATABASE.mongodb) {
          const jsonExplainActionId = await Mongodb.getExplainJSON({ example: notEmptyExample[0] });

          jsonExplain = await useActionResult(jsonExplainActionId);
        }

        // 3. Get tables
        let tables;
        if (databaseType === DATABASE.mysql && jsonExplain.value) {
          const parsedJSON = JSON.parse(jsonExplain.value);
          tables = [
            get(parsedJSON, 'query_block.table.table_name')
              || get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
          ].filter(Boolean);
        }

        if (databaseType === DATABASE.postgresql && examples) {
          tables = examples[0].tables || [];
        }

        // 4. Store data to context
        contextActions.setFoundData({
          examples,
          databaseType,
          jsonExplain,
          traditionalExplain,
          tables,
        });
      } catch (e) {
        // TODO: add error handling
      }
    })();
  }, [queryId]);
};

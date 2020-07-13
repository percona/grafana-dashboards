import { useContext, useEffect } from 'react';
import { get } from 'lodash';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { DetailsProvider } from './Details.provider';
import { DATABASE } from './Details.constants';
import DetailsService from './Details.service';
import { mysqlMethods, mongodbMethods } from './database-models';
import { ActionResult } from './Details.types';

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
          clearInterval(intervalId);
          if (requestResult.error) {
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
          }
        }
      } catch (e) {
        clearInterval(intervalId);
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
        contextActions.resetDetailsToDefault();
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
        let classicExplain;

        // 2. Get explains
        try {
          if (!notEmptyExample.length) {
            jsonExplain = {};
            classicExplain = {};
          } else if (databaseType === DATABASE.mysql) {
            const traditionalExplainActionId = await mysqlMethods.getExplainTraditional({
              example: notEmptyExample[0],
            });
            const jsonExplainActionId = await mysqlMethods.getExplainJSON({ example: notEmptyExample[0] });

            jsonExplain = await useActionResult(jsonExplainActionId);
            classicExplain = await useActionResult(traditionalExplainActionId);
          } else if (databaseType === DATABASE.mongodb) {
            const jsonExplainActionId = await mongodbMethods.getExplainJSON({ example: notEmptyExample[0] });

            jsonExplain = await useActionResult(jsonExplainActionId);
          }
        } catch (e) {
          console.error(e);
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
          classicExplain,
          tables,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [queryId]);
};

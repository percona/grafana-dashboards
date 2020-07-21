import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { DATABASE } from './Details.constants';
import DetailsService from './Details.service';
import { ActionResult, DatabasesType } from './Details.types';

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

export const useDetailsState = (): [boolean, any, DatabasesType] => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels
    },
  } = useContext(QueryAnalyticsProvider);
  const [loading, setLoading] = useState<boolean>(false);
  const [examples, setExamples] = useState<any>([]);
  const [databaseType, setDatabaseType] = useState<string>(DATABASE.mysql);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
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

        setExamples(examples);
        setDatabaseType(databaseType);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [queryId]);

  return [loading, examples, databaseType];
};

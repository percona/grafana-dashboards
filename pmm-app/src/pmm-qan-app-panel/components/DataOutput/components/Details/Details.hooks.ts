import { useContext, useEffect, useState } from 'react';
import ExampleService from './Example/Example.service';
import { PanelProvider } from '../../../../panel/panel.provider';
import DetailsService from './Details.service';

export const useDatabaseType = () => {
  const {
    panelState: { queryId, groupBy, from, to, labels },
  } = useContext(PanelProvider);
  const [databaseType, setDatabaseType] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels: labels,
          tables: [],
        });
        setDatabaseType(result['query_examples'][0].service_type);
      } catch (e) {
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return databaseType;
};

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

import { useContext, useEffect, useState } from 'react';
import ExampleService from './Example.service';
import { PanelProvider } from '../../../../../panel/panel.provider';

export const useExamples = (): [any[], boolean] => {
  const {
    panelState: { queryId, groupBy, from, to, labels },
  } = useContext(PanelProvider);
  const [examples, setExamples] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await ExampleService.getExample({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
        });
        setExamples(result['query_examples']);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        //TODO: add error handling
      }
    })();
  }, [queryId]);

  return [examples, loading];
};

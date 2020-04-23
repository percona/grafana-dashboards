import { useContext, useEffect, useState } from 'react';
import ExampleService from './Example/Example.service';
import { StateContext } from '../../StateContext';

export const useDatabaseType = () => {
  const {
    panelState: { queryId, groupBy, from, to, fingerprint, controlSum, labels },
  } = useContext(StateContext);
  const [databaseType, setDatabaseType] = useState('');
  useEffect(() => {
    // setActiveTab(TabKeys.Details);
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

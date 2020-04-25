import { useContext, useEffect, useState } from 'react';
import ExampleService from './Example/Example.service';
import { QueryAnalyticsProvider } from '../../panel/QueryAnalyticsProvider';

export const useDatabaseType = () => {
  const {
    panelState: { queryId, groupBy, from, to, labels },
  } = useContext(QueryAnalyticsProvider);
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

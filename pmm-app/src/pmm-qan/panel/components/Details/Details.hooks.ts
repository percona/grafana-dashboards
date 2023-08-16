import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import DetailsService from './Details.service';
import { DatabasesType, QueryExampleResponseItem } from './Details.types';

export const useDetails = (): [boolean, QueryExampleResponseItem[], DatabasesType] => {
  const {
    panelState: {
      queryId,
      groupBy,
      from,
      to,
      labels,
    },
  } = useContext(QueryAnalyticsProvider);
  const [loading, setLoading] = useState<boolean>(false);
  const [examples, setExamples] = useState<QueryExampleResponseItem[]>([]);
  const [databaseType, setDatabaseType] = useState<DatabasesType>();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // clear state so we don't get
        // invalid data in between query changes
        setExamples([]);
        setDatabaseType(undefined);

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

        // clear database type first
        // won't be an issue once we upgrade to React 18 (batched updates)
        setDatabaseType(databaseType);
        setExamples(examples);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId]);

  return [loading, examples, databaseType];
};

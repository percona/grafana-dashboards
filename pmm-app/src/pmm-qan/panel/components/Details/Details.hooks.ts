import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { Databases } from 'shared/core';
import DetailsService from './Details.service';
import { DatabasesType } from './Details.types';

export const useDetails = (): [boolean, any, DatabasesType] => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels,
    },
  } = useContext(QueryAnalyticsProvider);
  const [loading, setLoading] = useState<boolean>(false);
  const [examples, setExamples] = useState<any>([]);
  const [databaseType, setDatabaseType] = useState<DatabasesType>(Databases.mysql);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId]);

  return [loading, examples, databaseType];
};

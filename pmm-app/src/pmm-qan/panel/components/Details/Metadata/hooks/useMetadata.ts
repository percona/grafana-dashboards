import { useContext, useEffect, useState } from 'react';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import MetadataService from '../Metadata.service';

export const useMetadata = (): [any[], boolean] => {
  const {
    panelState: {
      queryId, groupBy, from, to, labels, totals,
    },
  } = useContext(QueryAnalyticsProvider);
  const [metadata, setMetadata] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        await MetadataService.getMetadata({
          filterBy: queryId,
          groupBy,
          from,
          to,
          labels,
          totals,
        });

        const example = ([
          {
            name: 'service_name',
            value: 'pmm-server-postgresql',
            tooltip: 'nobody_knows',
          },
          {
            name: 'database',
            value: 'postgres',
            tooltip: 'nobody_knows',
          },
          {
            name: 'username',
            value: 'pmm-managed',
            tooltip: 'nobody_knows',
          },
          {
            name: 'service_type',
            value: 'postgresql',
            tooltip: 'nobody_knows',
          },
          {
            name: 'service_id',
            value: '/service_id/474ce648-599c-4f4d-a0a4-af0c38609e4e',
            tooltip: 'nobody_knows',
          },
          {
            name: 'node_id',
            value: 'pmm-server',
            tooltip: 'nobody_knows',
          },
          {
            name: 'node_name',
            value: 'pmm-server',
            tooltip: 'nobody_knows',
          },
          {
            name: 'node_type',
            value: 'generic',
            tooltip: 'nobody_knows',
          },
          {
            name: 'agent_id',
            value: '/agent_id/d24b9506-f1de-4221-a23b-39b1e4cd5fd4',
            tooltip: 'nobody_knows',
          },
          {
            name: 'agent_type',
            value: 'qan-postgresql-pgstatements-agrnt',
            tooltip: 'nobody_knows',
          },
        ]);

        setMetadata(example);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        // TODO: add error handling
      }
    };

    getMetadata().then((r) => console.log(r));
  }, [queryId, groupBy, from, to, labels, totals]);

  return [metadata, loading];
};

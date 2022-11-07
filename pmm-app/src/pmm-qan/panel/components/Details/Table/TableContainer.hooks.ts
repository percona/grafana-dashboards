import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Databases } from 'shared/core';
import { useExplains } from '../Explain/Explain.hooks';

export const useTables = (examples, databaseType): any[] => {
  const [jsonExplain, classicExplain] = useExplains(examples, databaseType);
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTables = async () => {
      setLoading(true);
      setTables([]);
      if (databaseType === Databases.mysql && jsonExplain.value) {
        const parsedJSON = JSON.parse(jsonExplain.value);

        const tablesResult = [
          get(parsedJSON, 'query_block.table.table_name')
            || get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
        ].filter(Boolean);

        setTables(tablesResult);
      }

      if (databaseType === Databases.postgresql && examples) {
        const tablesResult = examples[0].tables || [];

        setTables(tablesResult);
      }

      setLoading(false);
    };

    getTables();
  }, [jsonExplain, classicExplain, examples, databaseType]);

  return [tables, loading];
};

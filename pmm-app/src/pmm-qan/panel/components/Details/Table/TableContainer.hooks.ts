import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { DATABASE } from '../Details.constants';
import { useExplains } from '../Explain/Explain.hooks';

export const useTables = (examples, databaseType): any[] => {
  const [jsonExplain, classicExplain] = useExplains(examples, databaseType);
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const getTables = async () => {
      if (databaseType === DATABASE.mysql && jsonExplain.value) {
        const parsedJSON = JSON.parse(jsonExplain.value);

        const tablesResult = [
          get(parsedJSON, 'query_block.table.table_name')
          || get(parsedJSON, 'query_block.ordering_operation.grouping_operation.table.table_name'),
        ].filter(Boolean);

        setTables(tablesResult);
      }

      if (databaseType === DATABASE.postgresql && examples) {
        const tablesResult = examples[0].tables || [];

        setTables(tablesResult);
      }
    };

    getTables();
  }, [jsonExplain, classicExplain, examples, databaseType]);

  return [tables];
};

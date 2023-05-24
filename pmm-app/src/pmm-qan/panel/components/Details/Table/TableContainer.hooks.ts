import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Databases } from 'shared/core';

export const useTables = (example, explains, databaseType): any[] => {
  const { jsonExplain, classicExplain } = explains;
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTables = async () => {
      setLoading(true);
      setTables([]);
      if (databaseType === Databases.mysql && jsonExplain.value) {
        const parsedJSON = JSON.parse(jsonExplain.value);

        const realTableName = [
          get(parsedJSON, 'real_table_name'),
        ].filter(Boolean);

        setTables(realTableName);
      }

      if (databaseType === Databases.postgresql && example) {
        const tablesResult = example.tables || [];

        setTables(tablesResult);
      }

      setLoading(false);
    };

    getTables();
  }, [jsonExplain, classicExplain, example, databaseType]);

  return [tables, loading];
};

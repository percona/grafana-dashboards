import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Databases } from 'shared/core';
import { Parser } from 'lite-ui-sql-parser';

export const useTables = (example, explains, databaseType): any[] => {
  const { jsonExplain, classicExplain } = explains;
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTables = async () => {
      setLoading(true);
      setTables([]);
      if (databaseType === Databases.mysql && example && jsonExplain) {
        const parser = new Parser();
        const ast = parser.astify(example?.example);

        const tablesResult = [
          get(ast, 'from.0.table'),
        ].filter(Boolean);

        setTables(tablesResult);
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

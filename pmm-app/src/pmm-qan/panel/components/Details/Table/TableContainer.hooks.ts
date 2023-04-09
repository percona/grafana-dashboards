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
      if (databaseType === Databases.mysql && example && jsonExplain) {
        // eslint-disable-next-line global-require
        const parser = require('sqlite-parser');
        const ast = parser(example?.example);

        const tablesResult = [
          get(ast, 'statement.0.from.source.name') || get(ast, 'statement.0.from.name'),
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

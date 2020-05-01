import { useExamples } from '../Example/Example.hooks';
import { useExplain } from '../Explain/Explain.hooks';
import { useEffect, useState } from 'react';
import { DATABASE } from '../Details.constants';

export const useTables = databaseType => {
  const [examples] = useExamples();
  const [jsonExplain] = useExplain();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (databaseType === DATABASE.mysql) {
      setTables([JSON.parse(jsonExplain).query_block.table.table_name]);
    }
  }, [jsonExplain]);

  useEffect(() => {
    if (databaseType === DATABASE.postgresql) {
      setTables(examples[0].tables);
    }
  }, [examples]);

  return tables;
};

import { useEffect, useState } from 'react';
import { DATABASE } from '../Details.constants';
import { mongodbMethods, mysqlMethods } from '../database-models';
import { useActionResult } from '../Details.hooks';

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useExplains = (examples, databaseType): any[] => {
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const [classicExplain, setClassicExplain] = useState(actionResult);
  // 2. Get explains

  useEffect(() => {
    const getExplains = async () => {
      const notEmptyExample = examples ? examples.filter((example) => example.example) : [];

      try {
        if (!notEmptyExample.length) {
          setJsonExplain({ ...actionResult, loading: false });
          setClassicExplain({ ...actionResult, loading: false });

          return;
        }

        if (databaseType === DATABASE.mysql) {
          const traditionalExplainActionId = await mysqlMethods.getExplainTraditional({
            example: notEmptyExample[0],
          });
          const jsonExplainActionId = await mysqlMethods.getExplainJSON({ example: notEmptyExample[0] });

          const jsonResult = await useActionResult(jsonExplainActionId);
          const classicResult = await useActionResult(traditionalExplainActionId);

          setJsonExplain(jsonResult);
          setClassicExplain(classicResult);
        } else if (databaseType === DATABASE.mongodb) {
          const jsonExplainActionId = await mongodbMethods.getExplainJSON({ example: notEmptyExample[0] });

          const jsonResult = await useActionResult(jsonExplainActionId);

          setJsonExplain(jsonResult);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getExplains();
  }, [examples, databaseType]);

  return [jsonExplain, classicExplain];
};

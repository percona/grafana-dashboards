import { useEffect, useState } from 'react';
import { getActionResult } from 'shared/components/Actions/Actions.utils';
import { Databases } from 'shared/core';
import { mongodbMethods, mysqlMethods } from '../database-models';
import { parseExplain } from './Explain.tools';

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useExplains = (examples, databaseType): any[] => {
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const [classicExplain, setClassicExplain] = useState(actionResult);
  const [visualExplain, setVisualExplain] = useState(actionResult);

  useEffect(() => {
    const getExplains = async () => {
      const notEmptyExample = examples ? examples.filter((example) => example.example) : [];

      try {
        setJsonExplain(actionResult);
        setClassicExplain(actionResult);
        setVisualExplain(actionResult);
        if (!notEmptyExample.length) {
          setJsonExplain({ ...actionResult, loading: false });
          setClassicExplain({ ...actionResult, loading: false });

          return;
        }

        if (databaseType === Databases.mysql) {
          const traditionalExplainActionId = await mysqlMethods.getExplainTraditional({
            example: notEmptyExample[0],
          });
          const jsonExplainActionId = await mysqlMethods.getExplainJSON({ example: notEmptyExample[0] });

          const jsonResult = await getActionResult(jsonExplainActionId);
          const classicResult = await getActionResult(traditionalExplainActionId);
          const jsonValue = parseExplain(jsonResult);
          const classicValue = parseExplain(classicResult);

          setJsonExplain({ ...jsonResult, value: jsonValue ? jsonValue.explain_result : jsonValue });
          setClassicExplain({ ...classicResult, value: classicValue });
        } else if (databaseType === Databases.mongodb) {
          const jsonExplainActionId = await mongodbMethods.getExplainJSON({ example: notEmptyExample[0] });

          const jsonResult = await getActionResult(jsonExplainActionId);

          setJsonExplain(jsonResult);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getExplains();
  }, [examples, databaseType]);

  return [jsonExplain, classicExplain, visualExplain];
};

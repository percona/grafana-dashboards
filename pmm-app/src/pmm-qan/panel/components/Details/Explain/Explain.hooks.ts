import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { useContext, useEffect, useState } from 'react';
import { getActionResult } from 'shared/components/Actions/Actions.utils';
import { Databases } from 'shared/core';
import { mongodbMethods, mysqlMethods } from '../database-models';
import { QueryExampleResponseItem } from '../Details.types';
import { parseExplain } from './Explain.tools';
import { UseExplain } from './Explain.types';

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useExplains = (examples, databaseType, placeholders?: string[]): UseExplain => {
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const [classicExplain, setClassicExplain] = useState(actionResult);
  const [visualExplain, setVisualExplain] = useState(actionResult);
  const [example, setExample] = useState<QueryExampleResponseItem>();
  const {
    panelState: { queryId },
  } = useContext(QueryAnalyticsProvider);

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

        setExample(notEmptyExample[0]);

        if (databaseType === Databases.mysql && (placeholders || !notEmptyExample[0]?.placeholder_count)) {
          const traditionalExplainActionId = await mysqlMethods.getExplainTraditional({
            example: notEmptyExample[0],
            queryId,
            placeholders,
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
  }, [queryId, examples, databaseType, placeholders]);

  return {
    jsonExplain,
    classicExplain,
    visualExplain,
    example,
  };
};

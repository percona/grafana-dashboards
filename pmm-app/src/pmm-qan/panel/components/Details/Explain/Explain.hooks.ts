import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { useContext, useEffect, useState } from 'react';
import { fetchExplains } from './Explain.tools';

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useExplains = (examples, databaseType): any[] => {
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const [classicExplain, setClassicExplain] = useState(actionResult);
  const [visualExplain, setVisualExplain] = useState(actionResult);
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

        if (!notEmptyExample.length || !queryId) {
          setJsonExplain({ ...actionResult, loading: false });
          setClassicExplain({ ...actionResult, loading: false });

          return;
        }

        const results = await fetchExplains(queryId, notEmptyExample[0], databaseType);

        setClassicExplain(results.classicExplain);
        setJsonExplain(results.jsonExplain);
      } catch (e) {
        console.error(e);
      }
    };

    getExplains();
  }, [queryId, examples, databaseType]);

  return [jsonExplain, classicExplain, visualExplain];
};

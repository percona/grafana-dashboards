import React, { useEffect, useMemo, useState } from 'react';
import { ActionResult } from 'shared/components/Actions';
import { fetchExplains } from '../Explain/Explain.tools';
import { ExplainPlaceholdersProps } from './ExplainPlaceholders.types';
import PlaceholdersForm from './PlaceholdersForm';
import { PlaceholdersFormValues } from './PlaceholdersForm/PlaceholdersForm.types';

const actionResult: ActionResult = {
  error: '',
  loading: true,
  value: null,
};

const ExplainPlaceholders: React.FC<ExplainPlaceholdersProps> = ({
  queryId,
  databaseType,
  examples,
  children,
}) => {
  const [classicExplain, setClassicExplain] = useState(actionResult);
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const [visualExplain, setVisualExplain] = useState(actionResult);
  const [initialized, setInitialized] = useState(false);
  const example = useMemo(
    () => examples.find((e) => e.example || e.explain_fingerprint || e.query_id),
    [examples],
  );

  useEffect(() => {
    setInitialized(false);
    setClassicExplain(actionResult);
    setJsonExplain(actionResult);
    setVisualExplain(actionResult);

    if (example && (!example.placeholders_count || !!example.example)) {
      setInitialized(true);
      handlePlaceholderSubmit({ placeholders: [] });
    } else if (!example) {
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example]);

  const handlePlaceholderSubmit = async ({ placeholders }: PlaceholdersFormValues) => {
    if (!example || !queryId) {
      setInitialized(true);

      return;
    }

    const results = await fetchExplains(queryId, example, databaseType, placeholders);

    setClassicExplain(results.classicExplain);
    setJsonExplain(results.jsonExplain);
    setVisualExplain(results.visualExplain);

    setInitialized(true);
  };

  if (!initialized && example) {
    return <PlaceholdersForm onSubmit={handlePlaceholderSubmit} example={example} />;
  }

  return (
    <>
      {children({
        example,
        databaseType,
        classicExplain,
        jsonExplain,
        visualExplain,
      })}
    </>
  );
};

export default ExplainPlaceholders;

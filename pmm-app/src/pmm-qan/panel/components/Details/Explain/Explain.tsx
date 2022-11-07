import React, { FC, useContext, useEffect, useState } from 'react';
import { Collapse } from '@grafana/ui';
import { Databases } from 'shared/core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { ExplainProps, ExplainTabs } from './Explain.types';
// import { VisualExplain } from './components/VisualExplain/VisualExplain';
import { ClassicExplain } from './components/ClassicExplain/ClassicExplain';
import { JsonExplain } from './components/JsonExplain/JsonExplain';
import PrepareExplain from './components/PrepareExplain/PrepareExplain';
import { fetchExplains } from './Explain.tools';

const actionResult = {
  error: '',
  loading: true,
  value: null,
};

const Explain: FC<ExplainProps> = ({ databaseType, examples }) => {
  const example = examples.find((e) => e.example);

  const [showExplain, setShowExplain] = useState(false);
  const [classicExplainKey, setClassicExplainKey] = useState(true);
  const [classicExplain, setClassicExplain] = useState(actionResult);
  const [jsonExplainKey, setJsonExplainKey] = useState(true);
  const [jsonExplain, setJsonExplain] = useState(actionResult);
  const {
    panelState: { queryId },
  } = useContext(QueryAnalyticsProvider);

  useEffect(() => {
    if (databaseType !== 'mysql') {
      handlePlaceholdersSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryId, databaseType]);

  useEffect(() => {
    if (!example?.placeholders_count) {
      handlePlaceholdersSubmit();
    } else {
      setShowExplain(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [example]);

  const handlePlaceholdersSubmit = async (placeholders: string[] = []) => {
    setShowExplain(false);

    if (!example || !queryId) {
      return;
    }

    setClassicExplain(actionResult);
    setJsonExplain(actionResult);

    const results = await fetchExplains(queryId, example, databaseType, placeholders);

    setClassicExplain(results.classicExplain);
    setJsonExplain(results.jsonExplain);

    setShowExplain(true);
  };

  if (databaseType === Databases.mysql && !showExplain && example && example?.placeholders_count) {
    return <PrepareExplain example={example} onPlaceholdersSubmit={handlePlaceholdersSubmit} />;
  }

  return (
    <div>
      {databaseType !== Databases.mongodb ? (
        <Collapse
          collapsible
          label={ExplainTabs.classic}
          isOpen={classicExplainKey}
          onToggle={() => setClassicExplainKey(!classicExplainKey)}
        >
          <ClassicExplain classicExplain={classicExplain} />
        </Collapse>
      ) : null}
      <Collapse
        collapsible
        label={ExplainTabs.json}
        isOpen={jsonExplainKey}
        onToggle={() => setJsonExplainKey(!jsonExplainKey)}
      >
        <JsonExplain jsonExplain={jsonExplain} />
      </Collapse>
      {/* {databaseType !== Databases.mongodb ? ( */}
      {/*  <Collapse */}
      {/*    collapsible */}
      {/*    label={ExplainTabs.visual} */}
      {/*    isOpen={visualExplainKey} */}
      {/*    onToggle={() => setVisualExplainKey(!visualExplainKey)} */}
      {/*  > */}
      {/*    <VisualExplain databaseType={databaseType} examples={examples} /> */}
      {/*  </Collapse> */}
      {/* ) : null} */}
    </div>
  );
};

export default Explain;

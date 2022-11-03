import React, { FC, useContext, useEffect, useState } from 'react';
import { Collapse } from '@grafana/ui';
import { Databases } from 'shared/core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { ExplainProps, ExplainTabs } from './Explain.types';
// import { VisualExplain } from './components/VisualExplain/VisualExplain';
import { ClassicExplain } from './components/ClassicExplain/ClassicExplain';
import { JsonExplain } from './components/JsonExplain/JsonExplain';
import PrepareExplain from './components/PrepareExplain/PrepareExplain';

const Explain: FC<ExplainProps> = ({ databaseType, examples }) => {
  const [classicExplainKey, setClassicExplainKey] = useState(true);
  const [jsonExplainKey, setJsonExplainKey] = useState(true);
  const [placeholders, setPlaceholders] = useState<string[]>();
  const example = examples.find((e) => e.example);
  const {
    panelState: { queryId },
  } = useContext(QueryAnalyticsProvider);
  // const [visualExplainKey, setVisualExplainKey] = useState(true);

  useEffect(() => {
    setPlaceholders(undefined);
  }, [queryId]);

  if (databaseType === Databases.mysql && !!example?.placeholders_count && !placeholders) {
    return <PrepareExplain example={example} onPlaceholdersSubmit={setPlaceholders} />;
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
          <ClassicExplain databaseType={databaseType} examples={examples} placeholders={placeholders} />
        </Collapse>
      ) : null}
      <Collapse
        collapsible
        label={ExplainTabs.json}
        isOpen={jsonExplainKey}
        onToggle={() => setJsonExplainKey(!jsonExplainKey)}
      >
        <JsonExplain databaseType={databaseType} examples={examples} placeholders={placeholders} />
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

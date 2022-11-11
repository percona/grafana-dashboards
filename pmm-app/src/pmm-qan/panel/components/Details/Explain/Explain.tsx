import React, { FC, useContext, useState } from 'react';
import { Collapse } from '@grafana/ui';
import { Databases } from 'shared/core';
import { QueryAnalyticsProvider } from 'pmm-qan/panel/provider/provider';
import { ExplainProps, ExplainTabs } from './Explain.types';
// import { VisualExplain } from './components/VisualExplain/VisualExplain';
import { ClassicExplain } from './components/ClassicExplain/ClassicExplain';
import { JsonExplain } from './components/JsonExplain/JsonExplain';
import ExplainPlaceholders from '../ExplainPlaceholders';

const Explain: FC<ExplainProps> = ({ databaseType, examples }) => {
  const [classicExplainKey, setClassicExplainKey] = useState(true);
  const [jsonExplainKey, setJsonExplainKey] = useState(true);
  const {
    panelState: { queryId },
  } = useContext(QueryAnalyticsProvider);

  return (
    <ExplainPlaceholders queryId={queryId} databaseType={databaseType} examples={examples}>
      {({ classicExplain, jsonExplain }) => (
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
      )}
    </ExplainPlaceholders>
  );
};

export default Explain;

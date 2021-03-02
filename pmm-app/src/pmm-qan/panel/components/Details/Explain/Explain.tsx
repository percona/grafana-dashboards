import React, { FC, useState } from 'react';
import { Collapse } from '@grafana/ui';
import { Databases } from 'shared/core';
import { ExplainProps, ExplainTabs } from './Explain.types';
// import { VisualExplain } from './components/VisualExplain/VisualExplain';
import { ClassicExplain } from './components/ClassicExplain/ClassicExplain';
import { JsonExplain } from './components/JsonExplain/JsonExplain';

const Explain: FC<ExplainProps> = ({ databaseType, examples }) => {
  const [classicExplainKey, setClassicExplainKey] = useState(true);
  const [jsonExplainKey, setJsonExplainKey] = useState(true);
  // const [visualExplainKey, setVisualExplainKey] = useState(true);

  return (
    <div>
      {databaseType !== Databases.mongodb ? (
        <Collapse
          collapsible
          label={ExplainTabs.classic}
          isOpen={classicExplainKey}
          onToggle={() => setClassicExplainKey(!classicExplainKey)}
        >
          <ClassicExplain databaseType={databaseType} examples={examples} />
        </Collapse>
      ) : null}
      <Collapse
        collapsible
        label={ExplainTabs.json}
        isOpen={jsonExplainKey}
        onToggle={() => setJsonExplainKey(!jsonExplainKey)}
      >
        <JsonExplain databaseType={databaseType} examples={examples} />
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

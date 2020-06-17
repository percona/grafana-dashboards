import Highlight from 'react-highlight.js';
import React from 'react';
import sqlFormatter from 'sql-formatter';
import { DATABASE } from '../Details.constants';
import { ReactJSON } from '../../../../../shared/components/Elements/ReactJSON/ReactJSON';

export const getExample = (databaseType) => (example: any): any => {
  if (databaseType === DATABASE.mongodb) {
    return <ReactJSON key={example || ''} json={JSON.parse(example)} />;
  }

  return (
    <Highlight key={example || ''} language="sql">
      {sqlFormatter.format(example)}
    </Highlight>
  );
};

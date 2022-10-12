import React from 'react';
import sqlFormatter from 'sql-formatter';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { Databases } from 'shared/core';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import { logger } from '@percona/platform-core';
import { Messages } from '../Details.messages';

export const getExample = (databaseType) => (example: any): any => {
  if (databaseType === Databases.mongodb) {
    try {
      return <ReactJSON key={example || ''} json={JSON.parse(example)} />;
    } catch (e) {
      logger.error(e);
    }

    return <pre data-testid="example-query-invalid">{Messages.incompleteExample}</pre>;
  }

  return (
    <Highlight key={example || ''} language="sql">
      {sqlFormatter.format(example || '')}
    </Highlight>
  );
};

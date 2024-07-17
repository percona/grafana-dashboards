import React from 'react';
import sqlFormatter from 'sql-formatter';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { Databases, logger } from 'shared/core';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import ParseError from './ParseError/ParseError';
import { QueryExampleResponseItem } from '../Details.types';

export const getExample = (databaseType) => (example: any): any => {
  if (databaseType === Databases.mongodb) {
    try {
      return <ReactJSON key={example || ''} json={JSON.parse(example)} />;
    } catch (e) {
      logger.error(e);
    }

    return <ParseError />;
  }

  return (
    <Highlight key={example || ''} language="sql">
      {sqlFormatter.format(example || '')}
    </Highlight>
  );
};

export const extractExample = (example: QueryExampleResponseItem) => example.example
|| example.explain_fingerprint;

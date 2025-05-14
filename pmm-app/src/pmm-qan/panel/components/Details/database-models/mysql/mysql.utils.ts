import { SERVICE_ID_PREFIX } from 'shared/core';
import { QueryExampleResponseItem } from '../../Details.types';
import { MySQLExplainPayload } from './mysql.types';
import { stripPrefix } from '../utils';

export const getExplainPayload = (
  example: QueryExampleResponseItem,
  queryId: string,
  placeholders?: string[],
): MySQLExplainPayload => {
  const payload: MySQLExplainPayload = {
    database: example.database,
    service_id: stripPrefix(example.service_id, SERVICE_ID_PREFIX),
  };

  if (placeholders && placeholders?.length) {
    return {
      ...payload,
      placeholders,
      query_id: queryId,
    };
  }

  return {
    ...payload,
    query_id: queryId,
  };
};

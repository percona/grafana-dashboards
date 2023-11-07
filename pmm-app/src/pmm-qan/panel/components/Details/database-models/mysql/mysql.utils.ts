import { QueryExampleResponseItem } from '../../Details.types';
import { MySQLExplainPayload } from './mysql.types';

export const getExplainPayload = (
  example: QueryExampleResponseItem,
  queryId: string,
  placeholders?: string[],
): MySQLExplainPayload => {
  const payload: MySQLExplainPayload = {
    database: example.database,
    service_id: example.service_id,
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

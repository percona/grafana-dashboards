import { PostgreSQLExplain } from './postgresql.types';
import PostgresqlDatabaseService from './service';

export const postgresqlMethods = {
  getExplain: async ({ values, queryId, serviceId }: PostgreSQLExplain): Promise<string> => {
    const payload = {
      queryId,
      serviceId,
      values,
    };

    const result = await PostgresqlDatabaseService.getPostgreSQLExplain(payload);

    return result.action_id;
  },
  getShowCreateTables: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
      database,
    });

    return result.action_id;
  },
  getIndexes: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
      database,
    });

    return result.action_id;
  },
};

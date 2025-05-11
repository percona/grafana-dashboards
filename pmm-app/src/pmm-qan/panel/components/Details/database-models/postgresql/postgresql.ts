import PostgresqlDatabaseService from './service';
import { stripPrefix } from '../utils';

export const postgresqlMethods = {
  getShowCreateTables: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: stripPrefix(example.service_id, '/service_id/'),
      database,
    });

    return result.postgresql_show_create_table.action_id;
  },
  getIndexes: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: stripPrefix(example.service_id, '/service_id/'),
      database,
    });

    return result.postgresql_show_index.action_id;
  },
};

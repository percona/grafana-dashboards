import PostgresqlDatabaseService from './service';

export default {
  getShowCreateTables: async ({ example, tableName }) => {
    if (!tableName) {
      return null;
    }
    const result = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  },
  getIndexes: async ({ example, tableName }) => {
    if (!tableName) {
      return null;
    }
    const result = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  },
};

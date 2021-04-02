import PostgresqlDatabaseService from './service';

export const postgresqlMethods = {
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

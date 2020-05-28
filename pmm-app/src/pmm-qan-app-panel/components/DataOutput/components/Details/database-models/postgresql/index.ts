import PostgresqlDatabaseService from './service';

export default class PostgreSQL {
  static async getShowCreateTables({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const { action_id } = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  static async getIndexes({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const { action_id } = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }
}

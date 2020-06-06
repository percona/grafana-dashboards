import PostgresqlDatabaseService from './service';

export default class PostgreSQL {
  static async getShowCreateTables({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const result = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(result.action_id);
  }

  static async getIndexes({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const result = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(result.action_id);
  }

  static getExplains() {
    console.error('Does not exist for PostgreSQL');
  }

  static async getStatuses() {
    console.error('Does not exist for PostgreSQL');
  }
}

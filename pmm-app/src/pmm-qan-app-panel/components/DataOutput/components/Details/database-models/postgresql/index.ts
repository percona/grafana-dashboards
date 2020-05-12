import { GenericDatabase } from '../generic-database/generic-database';
import PostgresqlDatabaseService from './service';

export class PostgreSQL extends GenericDatabase {
  constructor() {
    super();
  }

  async getShowCreateTables({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display table info without query example, schema or table name at this moment.');
      return;
    }
    const { action_id } = await PostgresqlDatabaseService.getShowCreateTablePostgreSQL({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  async getIndexes({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display indexes info without table name at this moment.');
      return;
    }
    const { action_id } = await PostgresqlDatabaseService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  getStatuses() {}
}

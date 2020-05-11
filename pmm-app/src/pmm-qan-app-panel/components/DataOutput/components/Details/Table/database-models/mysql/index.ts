import { GenericDatabase } from '../generic-database';
import MysqlDatabaseService from './service';

export class Mysql extends GenericDatabase {
  constructor() {
    super();
  }

  async getShowCreateTables({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display table info without query example, schema or table name at this moment.');
      return;
    }
    const { action_id } = await MysqlDatabaseService.getShowCreateTableMySQL({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  async getIndexes({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display indexes info without query example, schema or table name at this moment.');
      return;
    }
    const { action_id } = await MysqlDatabaseService.getMysqlIndex({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  async getStatuses({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display status info without query example, schema or table name at this moment.');
      return;
    }
    const { action_id } = await MysqlDatabaseService.getMysqlTableStatus({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }
}

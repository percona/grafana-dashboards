import MysqlDatabaseService from './service';

export default class Mysql {
  static async getShowCreateTables({ example, tableName }) {
    if (!tableName) {
      return;
    }
    const result = await MysqlDatabaseService.getShowCreateTableMySQL({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  }

  static async getIndexes({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const result = await MysqlDatabaseService.getMysqlIndex({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    return result.action_id;
  }

  static async getStatuses({ example, tableName }) {
    if (!tableName) {
      return;
    }
    const result = await MysqlDatabaseService.getMysqlTableStatus({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    return result.action_id;
  }

  static async getExplainJSON({ example }) {
    try {
      const result = await MysqlDatabaseService.getTraditionalExplainJSONMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });
      return result.action_id;
    } catch (e) {
      console.error(e);
    }
  }

  static async getExplainTraditional({ example }) {
    try {
      const result = await MysqlDatabaseService.getTraditionalExplainMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });

      return result.action_id;
    } catch (e) {
      console.error(e);
    }
  }
}

import MysqlDatabaseService from './service';

export default class Mysql {
  static async getShowCreateTables({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const { action_id } = await MysqlDatabaseService.getShowCreateTableMySQL({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  static async getIndexes({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const { action_id } = await MysqlDatabaseService.getMysqlIndex({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  static async getStatuses({ example, tableName, setActionId }) {
    if (!tableName) {
      return;
    }
    const { action_id } = await MysqlDatabaseService.getMysqlTableStatus({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  static async getExplainJSON({ example, setActionId }) {
    try {
      const { action_id } = await MysqlDatabaseService.getTraditionalExplainJSONMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });
      setActionId(action_id);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // TODO: add error handling
    }
  }

  static async getExplainTraditional({ example, setActionId }) {
    try {
      const { action_id } = await MysqlDatabaseService.getTraditionalExplainMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });
      setActionId(action_id);
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // TODO: add error handling
    }
  }

  static getExplains({
    example, setActionIdTraditional, setActionIdJSON, setErrorText,
  }) {
    if (!('example' in example) || example.example === '') {
      setErrorText('Cannot display query explain without query example at this time.');
      return;
    }
    this.getExplainJSON({ example, setActionId: setActionIdJSON });
    this.getExplainTraditional({ example, setActionId: setActionIdTraditional });
  }
}

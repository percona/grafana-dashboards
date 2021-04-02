import MysqlDatabaseService from './service';

export const mysqlMethods = {
  getShowCreateTables: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await MysqlDatabaseService.getShowCreateTableMySQL({
      database: database || example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  },

  getIndexes: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await MysqlDatabaseService.getMysqlIndex({
      database: database || example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  },

  getStatuses: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await MysqlDatabaseService.getMysqlTableStatus({
      database: database || example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });

    return result.action_id;
  },

  getExplainJSON: async ({ example }) => {
    try {
      const result = await MysqlDatabaseService.getTraditionalExplainJSONMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });

      return result.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getExplainTraditional: async ({ example }) => {
    try {
      const result = await MysqlDatabaseService.getTraditionalExplainMysql({
        database: example.schema,
        query: example.example,
        service_id: example.service_id,
      });

      return result.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
};

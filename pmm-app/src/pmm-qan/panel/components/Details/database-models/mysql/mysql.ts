import { getExplainPayload } from './mysql.utils';
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

  getExplainJSON: async ({ example, queryId, placeholders }) => {
    try {
      const payload = getExplainPayload(example, queryId, placeholders);

      const result = await MysqlDatabaseService.getTraditionalExplainJSONMysql(payload);

      return result.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },

  getExplainTraditional: async ({ example, queryId, placeholders }) => {
    try {
      const payload = getExplainPayload(example, queryId, placeholders);

      const result = await MysqlDatabaseService.getTraditionalExplainMysql(payload);

      return result.action_id;
    } catch (e) {
      console.error(e);

      return null;
    }
  },
};

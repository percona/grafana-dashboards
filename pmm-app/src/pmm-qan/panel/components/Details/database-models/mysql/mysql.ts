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

    return result.mysql_show_create_table.action_id;
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

    return result.mysql_show_index.action_id;
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

    return result.mysql_show_table_status.action_id;
  },

  getExplainJSON: async ({ example, queryId, placeholders }) => {
    const payload = getExplainPayload(example, queryId, placeholders);

    const result = await MysqlDatabaseService.getExplainJSON(payload);

    return result.mysql_explain_json.action_id;
  },

  getExplain: async ({ example, queryId, placeholders }) => {
    const payload = getExplainPayload(example, queryId, placeholders);

    const result = await MysqlDatabaseService.getExplain(payload);

    return result.mysql_explain.action_id;
  },
};

import { SERVICE_ID_PREFIX } from 'shared/core';
import { getExplainPayload } from './mysql.utils';
import MysqlDatabaseService from './service';
import { stripPrefix } from '../utils';

export const mysqlMethods = {
  getShowCreateTables: async ({ example, tableName, database }) => {
    if (!tableName) {
      return null;
    }

    const result = await MysqlDatabaseService.getShowCreateTableMySQL({
      database: database || example.schema,
      table_name: tableName,
      service_id: stripPrefix(example.service_id, SERVICE_ID_PREFIX),
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
      service_id: stripPrefix(example.service_id, SERVICE_ID_PREFIX),
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
      service_id: stripPrefix(example.service_id, SERVICE_ID_PREFIX),
    });

    return result.mysql_show_table_status.action_id;
  },

  getExplainJSON: async ({ example, queryId, placeholders }, disableNotifications = false) => {
    const payload = getExplainPayload(example, queryId, placeholders);

    const result = await MysqlDatabaseService.getExplainJSON(payload, disableNotifications);

    return result.mysql_explain_json.action_id;
  },

  getExplain: async ({ example, queryId, placeholders }, disableNotifications = false) => {
    const payload = getExplainPayload(example, queryId, placeholders);

    const result = await MysqlDatabaseService.getExplain(payload, disableNotifications);

    return result.mysql_explain.action_id;
  },
};

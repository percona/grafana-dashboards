import IndexesService from '../components/Indexes/Indexes.service';
import { DATABASE } from '../../Details.constants';
import StatusService from '../components/Status/Status.service';

class GenericDatabase {
  constructor(props) {}
  getShowCreateTables() {
    throw new Error('Not available in superclass');
  }

  async getIndexes() {
    throw new Error('Not available in superclass');
  }

  getStatuses() {
    throw new Error('Not available in superclass');
  }
}

class Mysql extends GenericDatabase {
  constructor(props) {
    super(props);
  }
  getShowCreateTables() {}

  async getIndexes({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display indexes info without query example, schema or table name at this moment.');
      return;
    }
    const { action_id } = await IndexesService.getMysqlIndex({
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
    const { action_id } = await StatusService.getMysqlTableStatus({
      database: example.schema,
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }
}

class PostgreSQL extends GenericDatabase {
  constructor(props) {
    super(props);
  }
  getShowCreateTables() {}

  async getIndexes({ example, tableName, setErrorText, setActionId }) {
    if (!tableName) {
      setErrorText('Cannot display indexes info without table name at this moment.');
      return;
    }
    const { action_id } = await IndexesService.getPostgreSQLIndex({
      table_name: tableName,
      service_id: example.service_id,
    });
    setActionId(action_id as string);
  }

  getStatuses() {}
}

export const databaseFactory = databaseType => {
  switch (databaseType) {
    case DATABASE.mysql:
      return new Mysql();
    case DATABASE.postgresql:
      return new PostgreSQL();
    default:
      throw new Error('Unknown database type');
  }
};

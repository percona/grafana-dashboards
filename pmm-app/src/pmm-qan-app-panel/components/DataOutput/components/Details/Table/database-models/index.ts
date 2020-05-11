import { DATABASE } from '../../Details.constants';
import { Mysql } from './mysql';
import { PostgreSQL } from './postgresql';

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

import { DATABASE } from '../Details.constants';
import { Mysql } from './mysql';
import { PostgreSQL } from './postgresql';
import { Mongodb } from './mongodb';

export const databaseFactory = (databaseType) => {
  switch (databaseType) {
    case DATABASE.mysql:
      return new Mysql();
    case DATABASE.postgresql:
      return new PostgreSQL();
    case DATABASE.mongodb:
      return new Mongodb();
    default:
      throw new Error('Unknown database type');
  }
};

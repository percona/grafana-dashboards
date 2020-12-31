import { DATABASE_LABELS, Databases } from 'shared/core';
import { Operators } from './DBClusterBasicOptions.types';

export const OPERATORS = [Operators.xtradb, Operators.psmdb];

export const DatabaseOperators = {
  [Operators.xtradb]: DATABASE_LABELS[Databases.mysql],
  [Operators.psmdb]: DATABASE_LABELS[Databases.mongodb],
};

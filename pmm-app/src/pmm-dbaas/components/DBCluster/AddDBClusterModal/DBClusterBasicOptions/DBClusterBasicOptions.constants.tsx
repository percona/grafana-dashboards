import { Operators } from './DBClusterBasicOptions.types';

export const OPERATORS = [Operators.xtradb, Operators.psmdb];

export const DatabaseOperators = {
  [Operators.xtradb]: 'MySQL',
  [Operators.psmdb]: 'MongoDB',
};

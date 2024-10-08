import { DatabasesType } from '../../Details.types';

export interface QueryFingerprintProps {
  database: DatabasesType;
  placeholders: string[];
  fingerprint: string;
}

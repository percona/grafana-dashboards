import { ActionResult } from 'shared/components/Actions';

export type DatabasesType = 'mysql' | 'postgresql' | 'mongodb' | undefined;

export interface DetailsState {
  examples?: any;
  jsonExplain?: ActionResult;
  classicExplain?: ActionResult;
  tables?: any;
  databaseType?: DatabasesType;
}

export interface Details {
  contextActions: any;
  detailsState: DetailsState;
}

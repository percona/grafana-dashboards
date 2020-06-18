export type DatabasesType = 'mysql' | 'postgresql' | 'mongodb' | undefined;

export interface ActionResult {
  error: string;
  loading: boolean;
  value: any;
}

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

export type DatabasesType = 'mysql' | 'postgresql' | 'mongodb' | undefined;

export interface DetailsState {
  examples?: any;
  jsonExplain?: any;
  classicExplain?: any;
  tables?: any;
  databaseType?: DatabasesType;
}

export interface Details {
  contextActions: any;
  detailsState: DetailsState;
}

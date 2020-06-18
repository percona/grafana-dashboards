import { ActionResult, DatabasesType } from '../Details.types';

export interface ExplainProps {
  classicExplain: ActionResult;
  jsonExplain: ActionResult;
  databaseType: DatabasesType;
}

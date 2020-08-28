export interface ActionResult {
  error: string;
  loading: boolean;
  value: any;
}

export interface ActionRequest {
  action_id: string;
}

export interface ActionResponse {
  done: boolean;
  error: string;
  output: any;
}

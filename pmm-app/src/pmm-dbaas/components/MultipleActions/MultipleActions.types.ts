interface Action {
  title: string;
  action: (item?: any) => undefined;
}

export interface MultipleActionsProps {
  actions: Action[];
}

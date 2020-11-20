interface Action {
  title: string;
  action: () => void;
}

export interface MultipleActionsProps {
  actions: Action[];
  disabled?: boolean;
  dataQa?: string;
}

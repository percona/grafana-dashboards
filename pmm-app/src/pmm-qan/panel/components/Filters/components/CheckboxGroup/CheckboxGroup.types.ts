export interface CheckboxGroupProps {
  filter: string;
  name: string;
  showAll: boolean;
  group: string;
  items: any[];
  getDashboardURL?: (value: string) => string;
}

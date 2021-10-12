export interface SearchProps {
  dataTestId?: string;
  initialValue?: string;
  handleSearch: (values: SearchValues) => void;
}

export interface SearchValues {
  search: string;
}

export interface SearchProps {
  dataQa?: string;
  initialValue?: string;
  handleSearch: (values: SearchValues) => void;
}

export interface SearchValues {
  search: string;
}

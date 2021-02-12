const actionResult = {
  error: '',
  loading: true,
  value: null,
};

export const useExplains = jest.fn((examples, databaseType): any[] => {
  const jsonExplain = {
    error: '',
    loading: true,
    value: null,
  };

  const classicExplain = {
    error: '',
    loading: true,
    value: null,
  };

  const visualExplain = {
    error: '',
    loading: true,
    value: null,
  };

  return [jsonExplain, classicExplain, visualExplain];
});

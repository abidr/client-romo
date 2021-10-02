import useSWR from 'swr';

function useCurrency() {
  const { data, error } = useSWR('/currencies');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export default useCurrency;

import useSWR from 'swr';

function useMethods() {
  const { data, error } = useSWR('/methods');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export default useMethods;

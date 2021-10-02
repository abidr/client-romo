import useSWR from 'swr';

export function useGateways() {
  const { data, error } = useSWR('/gateways');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export default useGateways;

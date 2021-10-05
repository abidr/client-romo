import useSWR from 'swr';

function useGateways() {
  const { data, error } = useSWR('/gateways');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export function useGatewayCurrencies() {
  const { data, error } = useSWR('/gateways/currencies');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export default useGateways;

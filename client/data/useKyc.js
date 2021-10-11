import useSWR from 'swr';

export default function useKyc() {
  const { data, error } = useSWR('/kyc/me');
  return {
    data,
    loading: !data && !error,
    error,
  };
}

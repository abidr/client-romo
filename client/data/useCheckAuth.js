import useSWR from 'swr';

export default function useCheckAuth() {
  const { data, error } = useSWR('/checkauth');

  return {
    data,
    loading: !data && !error,
    error,
  };
}

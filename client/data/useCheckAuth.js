import useSWR from 'swr';

export default function useCheckAuth() {
  const { data, error } = useSWR('/checkauth', {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  });

  return {
    data,
    loading: !data && !error,
    error,
  };
}

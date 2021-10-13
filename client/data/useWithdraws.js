import useSWR from 'swr';

export default function useWithdraws(page, limit) {
  const { data, error } = useSWR(`/withdraws?sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

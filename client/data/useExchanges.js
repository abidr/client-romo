import useSWR from 'swr';

export default function useExchanges(page, limit) {
  const { data, error } = useSWR(`/exchanges?sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

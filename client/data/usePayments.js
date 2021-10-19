import useSWR from 'swr';

export default function usePayments(page, limit) {
  const { data, error } = useSWR(`/pays?sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

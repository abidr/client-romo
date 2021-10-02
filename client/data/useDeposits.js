import useSWR from 'swr';

export function useDepositAll(page, limit) {
  const { data, error } = useSWR(`/deposits?sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export function useDepositById(id) {
  const { data, error } = useSWR(`/deposits/${id}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

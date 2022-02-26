import useSWR from 'swr';

export function useBillAll(page, limit) {
  const { data, error } = useSWR(`/bills?sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export function useBillAllAdmin(page, limit, status, id) {
  const idFilter = !(id === '') ? `id=like:${id}%` : '';
  const statusFilter = !(status === 'all') ? `status=${status}` : '';
  const { data, error } = useSWR(`/bills/admin?${statusFilter}${idFilter}&sort_by=createdAt.desc&offset=${page - 1}&limit=${limit}`);
  return {
    data,
    loading: !data && !error,
    error,
  };
}

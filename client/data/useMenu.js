import useSWR from 'swr';

function useMainMenu() {
  const { data, error } = useSWR('/menu/main');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export function useFooterMenu() {
  const { data, error } = useSWR('/menu/footer');
  return {
    data,
    loading: !data && !error,
    error,
  };
}
export default useMainMenu;

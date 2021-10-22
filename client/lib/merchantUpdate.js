import cogoToast from 'cogo-toast';
import { mutate } from 'swr';
import request from '../config/api';

export default async function merchantUpdate(id, params, setActionLoader) {
  setActionLoader(true);
  try {
    const { data } = await request.put(`/merchants/${id}`, { ...params });
    setActionLoader(false);
    mutate(`/merchants/${id}`);
    cogoToast.success('Merchant Updated', { position: 'bottom-center' });
    return data;
  } catch (error) {
    const { data } = error.response;
    setActionLoader(false);
    cogoToast.error(data.message, { position: 'bottom-center' });
  }
  return null;
}

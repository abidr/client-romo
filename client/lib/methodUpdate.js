import cogoToast from 'cogo-toast';
import { mutate } from 'swr';
import request from '../config/api';

export default async function methodUpdate(id, params, setActionLoader) {
  setActionLoader(true);
  try {
    const { data } = await request.put(`/methods/${id}`, { ...params });
    setActionLoader(false);
    mutate(`/methods/${id}`);
    cogoToast.success(data.message, { position: 'bottom-center' });
    return data;
  } catch (error) {
    const { data } = error.response;
    setActionLoader(false);
    cogoToast.error(data.message, { position: 'bottom-center' });
  }
  return null;
}
export async function methodCreate(params, setActionLoader) {
  setActionLoader(true);
  try {
    const { data } = await request.post('/methods', { ...params });
    setActionLoader(false);
    mutate('/methods');
    cogoToast.success('New Method Added', { position: 'bottom-center' });
    return data;
  } catch (error) {
    const { data } = error.response;
    setActionLoader(false);
    cogoToast.error(data.message, { position: 'bottom-center' });
  }
  return null;
}

import cogoToast from 'cogo-toast';
import request from '../config/api';

export async function signInRequest(params, setLoading) {
  setLoading(true);
  try {
    const { data } = await request.post('/signin', { ...params });
    setLoading(false);
    window.location.href = '/dashboard';
    return data;
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    cogoToast.error(data.message, { position: 'bottom-center' });
  }
  return null;
}

export async function signUpRequest(params, setLoading) {
  setLoading(true);
  try {
    const { data } = await request.post('/signup', { ...params });
    setLoading(false);
    window.location.href = '/success';
    return data;
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    cogoToast.error(data.message || data.error, { position: 'bottom-center' });
  }
  return null;
}

export async function forgotRequest(params, setLoading) {
  setLoading(true);
  try {
    const { data } = await request.post('/forgot', { ...params });
    setLoading(false);
    window.location.href = '/reset-success';
    return data;
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    cogoToast.error(data.message || data.error, { position: 'bottom-center' });
  }
  return null;
}
export async function updatePassword(params, setLoading) {
  setLoading(true);
  try {
    const { data } = await request.post('/reset', { ...params });
    setLoading(false);
    window.location.href = '/';
    return data;
  } catch (error) {
    const { data } = error.response;
    setLoading(false);
    cogoToast.error(data.message || data.error, { position: 'bottom-center' });
  }
  return null;
}
export async function activationRequest(params) {
  try {
    const { data } = await request.post('/activate', { ...params });
    window.location.href = '/';
    return data;
  } catch (error) {
    const { data } = error.response;
    cogoToast.error(data.message || data.error, { position: 'bottom-center' });
  }
  return null;
}

export async function signOutRequest() {
  try {
    const { data } = await request.get('/signout');
    window.location.href = '/';
    return data;
  } catch (error) {
    const { data } = error.response;
    console.log(data);
  }
  return null;
}

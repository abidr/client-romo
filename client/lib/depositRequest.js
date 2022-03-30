import cogoToast from 'cogo-toast';
import request from '../config/api';
import postRedirect from '../utils/postRedirect';

export default async function depositRequest(params, setActionLoader) {
  setActionLoader(true);
  try {
    if (params?.payment_method === 'paydunya' && params?.amount < 200) {
      setActionLoader(false);
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (params?.payment_method === 'om' && params?.amount < 200) {
      setActionLoader(false);
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (params?.payment_method === 'mtn' && params?.amount < 200) {
      setActionLoader(false);
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (params?.payment_method === 'moov' && params?.amount < 200) {
      setActionLoader(false);
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (params?.payment_method === 'mtn' && !params?.number) {
      setActionLoader(false);
      return cogoToast.error('Number must be provided', { position: 'bottom-center' });
    }
    const { data } = await request.post('/deposits', { ...params });
    setActionLoader(false);
    if (data?.payment_method === 'perfectmoney') {
      postRedirect('https://perfectmoney.is/api/step1.asp', {
        PAYEE_ACCOUNT: data?.currency === 'USD' ? data?.payment?.usdWallet : data?.payment?.eurWallet,
        PAYEE_NAME: data?.payment?.site?.param1,
        PAYMENT_AMOUNT: data?.amount,
        PAYMENT_UNITS: data?.currency,
        PAYMENT_ID: data?.id,
        PAYMENT_URL: `${data?.payment?.appUrl?.param1}/add-money?status=success`,
        NOPAYMENT_URL: `${data?.payment?.appUrl?.param1}/add-money?status=failed`,
        STATUS_URL: `${data?.payment?.appUrl?.param1}/api/payments/perfectmoney`
      });
      return data;
    }
    window.location.href = data.redirect;
    return data;
  } catch (error) {
    const { data } = error.response;
    setActionLoader(false);
    cogoToast.error(data.message, { position: 'bottom-center' });
  }
  return null;
}

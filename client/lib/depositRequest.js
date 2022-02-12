import cogoToast from 'cogo-toast';
import request from '../config/api';
import postRedirect from '../utils/postRedirect';

export default async function depositRequest(params, setActionLoader) {
  setActionLoader(true);
  try {
    const { data } = await request.post('/deposits', { ...params });
    setActionLoader(false);
    if (data?.payment_method === 'paydunya' && data?.amount < 200) {
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (data?.payment_method === 'om' && data?.amount < 200) {
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (data?.payment_method === 'mtn' && data?.amount < 200) {
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
    if (data?.payment_method === 'moov' && data?.amount < 200) {
      return cogoToast.error('Amount must be greater than 200', { position: 'bottom-center' });
    }
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

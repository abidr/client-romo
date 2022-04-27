import axios from 'axios';
import cogoToast from 'cogo-toast';
import absoluteUrl from 'next-absolute-url';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BiCheckCircle
} from 'react-icons/bi';
import OtpInput from 'react-otp-input';
import request from '../config/api';

const Checkoutv2 = ({
  logo, site, apiUrl, trxData
}) => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { trxId } = router.query;
  const { t } = useTranslation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [otpCode, setOtpCode] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await request.post('/checkout/v2/customer/otp', {
        email, password, trxId
      });
      if (data?.success) {
        setStep(2);
      }
      setLoading(false);
    } catch (err) {
      const { data } = err.response;
      cogoToast.error(data.message, { position: 'bottom-center' });
      setLoading(false);
    }
  };
  const handlePay = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await request.post('/checkout/v2/customer/pay', {
        otpCode, trxId
      });
      if (data?.success) {
        setStep(3);
      }
      setLoading(false);
      setTimeout(() => {
        router.push(data?.redirect);
      }, 3000);
    } catch (err) {
      const { data } = err.response;
      cogoToast.error(data.message, { position: 'bottom-center' });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          {t('Checkout')}
          {' | '}
          {site?.param1}
        </title>
        <link rel="icon" href={`${apiUrl.param1}/public/${logo.param2}`} />
      </Head>
      <div className="checkoutv2">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="logo-container">
                <img src={`${apiUrl?.param1}/public/${logo?.param1}`} alt="" style={{ height: '80px' }} />
                {trxData?.data?.logo && (
                <img src={trxData?.data?.logo} alt="" style={{ height: '80px' }} />
                )}
              </div>
              <div className="deposit-box basic-card text-center">
                {!trxData?.success ? (
                  <h4>Invalid Transaction</h4>
                ) : (
                  <>
                    <div>
                      <h2>{trxData?.data?.name}</h2>
                      <p>{trxData?.data?.address}</p>
                      <hr />
                    </div>
                    {!(step === 3) && (
                    <div className="d-flex justify-content-center">
                      <p style={{ marginRight: '5px' }}>
                        Login with your
                        {' '}
                        {site?.param1}
                        {' '}
                        account to pay
                        {' '}
                      </p>
                      <h5>
                        <strong className="cl-green">
                          {trxData?.data?.amount}
                          {' '}
                          {trxData?.data?.currency}
                        </strong>
                      </h5>
                    </div>
                    )}
                    {step === 1 && (
                    <div className="site-auth checkout-auth">
                      <form onSubmit={handleSubmit}>
                        <input
                          className="box-input"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('Email Address')}
                        />
                        <input
                          className="box-input"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={t('Password')}
                        />
                        <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100">
                          {loading ? (
                            <Spinner animation="border" role="status" size="sm" />
                          ) : t('Account Login')}
                        </button>
                      </form>
                    </div>
                    )}
                    {step === 2 && (
                    <div className="site-auth checkout-auth">
                      <form onSubmit={handlePay}>
                        <OtpInput
                          value={otpCode}
                          onChange={(otp) => setOtpCode(otp)}
                          numInputs={6}
                          shouldAutoFocus
                          isInputNum
                          containerStyle="otp-input-checkout"
                        />
                        <p>Please check your email for the OTP code</p>
                        <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100">
                          {loading ? (
                            <Spinner animation="border" role="status" size="sm" />
                          ) : t('Pay Now')}
                        </button>
                      </form>
                    </div>
                    )}
                    {step === 3 && (
                    <div className="transaction-success">
                      <BiCheckCircle color="green" size={70} />
                      <h2>
                        {t('Payment Successful')}
                      </h2>
                      <p>
                        {trxData?.data?.amount}
                        {' '}
                        {trxData?.data?.currency}
                        {' '}
                        {t('paid to')}
                        {' '}
                        {trxData?.data?.name}
                      </p>
                      <p>{t('You will be redirected to the merchant website within 3 seconds')}</p>
                    </div>
                    )}
                    <div className="mt-20">
                      <p className="mb-0">
                        For any query or support contact:
                        {' '}
                        <a className="cl-green" href={`mailto:${trxData?.data?.email}`}>{trxData?.data?.email}</a>
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="text-center mt-20">
                <p>
                  &copy; 2022
                  {' '}
                  {site?.param1}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkoutv2;

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { origin } = absoluteUrl(req);
  const { data } = await axios.get(`${origin}/api/info`);
  const { data: trxData } = await axios.get(`${origin}/api/checkout/v2/find?trxId=${query?.trxId}`);
  return {
    props: {
      logo: data?.logo,
      site: data?.site,
      apiUrl: data?.apiUrl,
      trxData
    }
  };
}

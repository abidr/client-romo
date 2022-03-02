import cogoToast from 'cogo-toast';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';
import Loader from '../components/Loader';
import useSettings from '../data/useSettings';
import checkAuthAccess from '../hoc/checkAuthAccess';
import { signInRequest } from '../lib/authRequest';

const Login = () => {
  const recaptchaRef = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { data, loading: settingsLoading } = useSettings();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!captcha) {
      cogoToast.error(t('Please Verify Captcha'), { position: 'bottom-center' });
      return null;
    }
    const params = {
      email, password, captcha
    };
    signInRequest(params, setLoading);
    recaptchaRef.current.reset();
    setCaptcha('');
    return null;
  };

  if (settingsLoading) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Head>
        <title>
          {t('Login')}
          {' '}
          -
          {' '}
          {data?.site?.param1}
        </title>
        <link rel="icon" href={`${data?.apiUrl?.param1}/public/${data?.logo?.param2}`} />
      </Head>
      <div>
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="site-auth">
                <div className="lng-switch-cont">
                  <LanguageSwitch />
                </div>
                <div className="logo">
                  <a href="/"><img src={`${data?.apiUrl.param1}/public/${data?.logo?.param1}`} alt="sitename" /></a>
                </div>
                <h3>{t('Login Account')}</h3>
                <form onSubmit={handleLogin}>
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
                  <center>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={data?.recaptcha?.param1}
                      onChange={(value) => setCaptcha(value)}
                      theme="dark"
                    />
                  </center>
                  <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100 mt-20">
                    {loading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : t('Account Login')}
                  </button>
                </form>
                <div className="form-bottom mt-20">
                  <Link href="/register"><a>{t('Create new account')}</a></Link>
                  <Link href="/forgot-password">
                    <a>
                      {t('Forget Password')}
                      ?
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default checkAuthAccess(Login);

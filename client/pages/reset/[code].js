import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../components/LanguageSwitch';
import Loader from '../../components/Loader';
import useSettings from '../../data/useSettings';
import { updatePassword } from '../../lib/authRequest';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { code } = router.query;

  const { data, loading: settingsLoading } = useSettings();

  const handleForget = (e) => {
    e.preventDefault();
    const { password } = e.target;
    const params = {
      code,
      password: password?.value,
    };
    updatePassword(params, setLoading);
  };

  if (settingsLoading) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Head>
        <title>
          {t('Reset Password')}
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
                <h3>{t('Reset Password')}</h3>
                <form onSubmit={handleForget}>
                  <input
                    className="box-input"
                    type="password"
                    name="password"
                    placeholder={t('New Password')}
                    required
                  />
                  <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100">
                    {loading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : t('Submit')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

import Link from 'next/link';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import checkAuthAccessAdmin from '../../hoc/checkAuthAccessAdmin';
import siteLogo from '../../images/weblos-logo.png';
import { signInAdminRequest } from '../../lib/authRequest';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = (e) => {
    e.preventDefault();
    const params = {
      email, password,
    };
    signInAdminRequest(params, setLoading);
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              <div className="site-auth">
                <div className="logo">
                  <a href="/"><img src={siteLogo.src} alt="sitename" /></a>
                </div>
                <h3>{t('Account Login')}</h3>
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
                  <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100">
                    {loading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : t('Account Login')}
                  </button>
                </form>
                <div className="form-bottom mt-20">
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

export default checkAuthAccessAdmin(Login);

import React from 'react';
import { useTranslation } from 'react-i18next';
import siteLogo from '../images/weblos-logo.png';

const ForgotPassword = () => {
  const { t } = useTranslation();
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
                <h3>{t('Forget Password')}</h3>
                <form action="#">
                  <input className="box-input" type="email" placeholder={t('Email Address')} />
                  <button type="submit" className="bttn-mid btn-ylo w-100">{t('Reset Password')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

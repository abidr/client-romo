import React from 'react';
import siteLogo from '../images/weblos-logo.png';

const ForgotPassword = () => (
  <>
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <div className="site-auth">
              <div className="logo">
                <a href="/"><img src={siteLogo.src} alt="sitename" /></a>
              </div>
              <h3>Forget Password</h3>
              <form action="#">
                <input className="box-input" type="email" placeholder="Email Address" />
                <button className="bttn-mid btn-ylo w-100">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ForgotPassword;

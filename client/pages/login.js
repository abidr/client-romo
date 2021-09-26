import Link from 'next/link';
import React from 'react';
import siteLogo from '../images/weblos-logo.png';

const Login = () => (
  <>
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12">
            <div className="site-auth">
              <div className="logo">
                <a href="/"><img src={siteLogo.src} alt="sitename" /></a>
              </div>
              <h3>Login Account</h3>
              <form action="#">
                <input className="box-input" type="email" placeholder="Email Address" />
                <input className="box-input" type="password" placeholder="Password" />
                <button type="submit" className="bttn-mid btn-ylo w-100">Account Login</button>
              </form>
              <div className="form-bottom mt-20">
                <Link href="/register"><a>Create new account</a></Link>
                <Link href="/forgot-password"><a>Forget Password?</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Login;

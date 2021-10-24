import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import checkAuthAccessAdmin from '../../hoc/checkAuthAccessAdmin';
import siteLogo from '../../images/weblos-logo.png';
import { signInAdminRequest } from '../../lib/authRequest';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

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
                <h3>Admin Login</h3>
                <form onSubmit={handleLogin}>
                  <input
                    className="box-input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                  <input
                    className="box-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button disabled={loading} type="submit" className="bttn-mid btn-ylo w-100">
                    {loading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : 'Account Login'}
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

export default checkAuthAccessAdmin(Login);

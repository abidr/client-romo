import Link from 'next/link';
import React from 'react';
import siteLogo from '../images/weblos-logo.png';

const Signup = () => (
  <>
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-xl-5 col-lg-5 col-md-6 col-12">
            <div className="site-auth">
              <div className="logo">
                <a href="/"><img src={siteLogo.src} alt="sitename" /></a>
              </div>
              <h3>Registration</h3>
              <form action="#">
                <input className="box-input" type="text" placeholder="First Name" />
                <input className="box-input" type="text" placeholder="Last Name" />
                <input className="box-input" type="email" placeholder="Email Address" />
                <input className="box-input" type="text" placeholder="Phone Number" />
                <input className="box-input" type="password" placeholder="Password" />
                <input className="box-input" type="password" placeholder="Re-Password" />
                <button className="bttn-mid btn-ylo w-100">Register Now</button>
              </form>
              <div className="form-bottom mt-20">
                <Link href="/login"><a>Already have account?</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Signup;

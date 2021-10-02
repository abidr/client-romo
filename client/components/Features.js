/* eslint-disable max-len */
import React from 'react';
import features1 from '../images/features/1.png';
import features2 from '../images/features/2.png';
import features3 from '../images/features/3.png';
import features4 from '../images/features/4.png';
import features5 from '../images/features/5.png';
import features6 from '../images/features/6.png';
import features7 from '../images/features/7.png';
import features8 from '../images/features/8.png';

const Features = () => (
  <>
    <section className="features" id="features">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 centered">
            <div className="section-title">
              <h2>App Features</h2>
              <p>Wuisquam ratione, perferendis architecto earum deleniti ullam laborum deserunt blanditiis provident nemo?</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features1.src} alt="" />
              </div>
              <div className="content">
                <h3>User Panel</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features2.src} alt="" />
              </div>
              <div className="content">
                <h3>Add Money</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features3.src} alt="" />
              </div>
              <div className="content">
                <h3>Request Money</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features4.src} alt="" />
              </div>
              <div className="content">
                <h3>Send Money</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features5.src} alt="" />
              </div>
              <div className="content">
                <h3>Exchange</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features6.src} alt="" />
              </div>
              <div className="content">
                <h3>User To User</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features7.src} alt="" />
              </div>
              <div className="content">
                <h3>Withdraw</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-sm-6">
            <div className="single-features-box">
              <div className="img">
                <img src={features8.src} alt="" />
              </div>
              <div className="content">
                <h3>Referral</h3>
                <p>Dolorum libero beatae nesciunt itaque quas ad fuga numquam id porro, commodi quis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Features;

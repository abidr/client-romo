/* eslint-disable max-len */
import React from 'react';
import { default as howItWorks1, default as howItWorks2 } from '../images/howitworks/2.jpg';

const Howitworks = () => (
  <>
    <section className="howitworks" id="howitworks">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title centered">
              <h2>How it works</h2>
              <p>Wuisquam ratione, perferendis architecto earum deleniti ullam laborum deserunt blanditiis provident nemo?</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-sm-6 mb-80">
            <div className="single-howitworks">
              <h3>1. Deposit</h3>
              <p>Similique soluta nesciunt fugiat veritatis hic sapiente non temporibus velit explicabo nihil. Esse repudiandae non consectetur odit laboriosam voluptatibus, molestias debitis modi! dolor aperiam aspernatur deleniti quos illo, facere quisquam, praesentium maxime! Nisi in quis nostrum ipsam non. Rem, dolorem.</p>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6 mb-80">
            <img src={howItWorks1.src} alt="" />
          </div>
          <div className="col-xl-6 col-sm-6 order-xl-1 order-2 mb-80">
            <img src={howItWorks2.src} alt="" />
          </div>
          <div className="col-xl-6 col-sm-6 order-xl-2 order-1 mb-80">
            <div className="single-howitworks">
              <h3>2. Exchange</h3>
              <p>Similique soluta nesciunt fugiat veritatis hic sapiente non temporibus velit explicabo nihil. Esse repudiandae non consectetur odit laboriosam voluptatibus, molestias debitis modi! dolor aperiam aspernatur deleniti quos illo, facere quisquam, praesentium maxime! Nisi in quis nostrum ipsam non. Rem, dolorem.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-sm-6 mb-80">
            <div className="single-howitworks">
              <h3>3. Transfer</h3>
              <p>Similique soluta nesciunt fugiat veritatis hic sapiente non temporibus velit explicabo nihil. Esse repudiandae non consectetur odit laboriosam voluptatibus, molestias debitis modi! dolor aperiam aspernatur deleniti quos illo, facere quisquam, praesentium maxime! Nisi in quis nostrum ipsam non. Rem, dolorem.</p>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6 mb-80">
            <img src={howItWorks1.src} alt="" />
          </div>
          <div className="col-xl-6 col-sm-6 order-xl-1 order-2 mb-80">
            <img src={howItWorks2.src} alt="" />
          </div>
          <div className="col-xl-6 col-sm-6 order-xl-2 order-1 mb-80">
            <div className="single-howitworks">
              <h3>4. Withdraw</h3>
              <p>Similique soluta nesciunt fugiat veritatis hic sapiente non temporibus velit explicabo nihil. Esse repudiandae non consectetur odit laboriosam voluptatibus, molestias debitis modi! dolor aperiam aspernatur deleniti quos illo, facere quisquam, praesentium maxime! Nisi in quis nostrum ipsam non. Rem, dolorem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Howitworks;

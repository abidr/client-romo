/* eslint-disable max-len */
import Link from 'next/link';
import React from 'react';
import { BiUserPlus } from 'react-icons/bi';
import banner from '../images/banner-bg.jpg';
import bannerimg from '../images/mobile.png';

const Banner = () => (
  <>
    <section className="banner blue-overlay-2" style={{ backgroundImage: `url(${banner.src})` }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-md-7 col-12 d-flex align-items-center">
            <div className="banner-content">
              <h2>Wallet, exchanger, cryptocurrency, user to user transfer and referral system</h2>
              <p>Accusantium perferendis delectus id eligendi facere. Labore facilis amet atque blanditiis ratione!</p>
              <Link href="/dashboard">
                <a className="bttn-mid btn-ylo mr-10">
                  <BiUserPlus />
                  Get Started
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xl-5 col-md-5 col-12">
            <div className="banner-content img">
              <img src={bannerimg.src} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Banner;

import React from 'react';
import solution1 from '../images/solutions/1.jpg';
import solution2 from '../images/solutions/2.jpg';
import solution3 from '../images/solutions/3.jpg';
import solution4 from '../images/solutions/4.jpg';

const Solutions = () => (
  <>
    <section className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 centered">
            <div className="section-title">
              <h2>Solution for</h2>
              <p>Werferendis itaque sapiente at esse, repudiandae, doloribus officia voluptatem ratione</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="single-solutions">
              <div className="solutions-img">
                <img src={solution1} alt="" />
              </div>
              <div className="solutions-title">
                <h3>Freelancer</h3>
                <p>Dolorem accusamus maiores hic assumenda illum perferendis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="single-solutions">
              <div className="solutions-img">
                <img src={solution2} alt="" />
              </div>
              <div className="solutions-title">
                <h3>Internet Retailer</h3>
                <p>Dolorem accusamus maiores hic assumenda illum perferendis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="single-solutions">
              <div className="solutions-img">
                <img src={solution3} alt="" />
              </div>
              <div className="solutions-title">
                <h3>Online Professional</h3>
                <p>Dolorem accusamus maiores hic assumenda illum perferendis</p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="single-solutions">
              <div className="solutions-img">
                <img src={solution4} alt="" />
              </div>
              <div className="solutions-title">
                <h3>Affiliate Marketer</h3>
                <p>Dolorem accusamus maiores hic assumenda illum perferendis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Solutions;

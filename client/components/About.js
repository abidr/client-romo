import React from 'react';
import aboutImg from '../images/aboutImg.jpg';

const About = () => (
  <>
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <div className="about-img">
              <img src={aboutImg} alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12">
            <div className="about-content">
              <div className="section-title">
                <h2>Who we are</h2>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam itaque sapiente laboriosam explicabo, voluptatibus dicta nemo minima suscipit animi? Incidunt consectetur enim eveniet voluptates </p>
              <p>nostrum quisquam qui sequi. Ratione, omnis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, at. Alias sequi nemo tempora expedita magni obcaecati? Quasi dolores rem dicta, itaque, reprehenderit cupiditate corporis odit doloremque iusto esse error. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, deleniti, obcaecati voluptate ratione inventore expedita assumenda corporis, totam tempora eos delectus perferendis neque numquam debitis. Eius sit hic fuga reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet asperiores hic omnis expedita, cumque recusandae aspernatur debitis quam minima aliquid placeat iusto, corporis molestiae sed earum tenetur eveniet nostrum vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, repellendus est ut repudiandae obcaecati saepe quos sed nulla rerum perspiciatis quasi soluta ullam facilis, harum quia! Nulla libero laboriosam nobis.</p>
              <p>ratione inventore expedita assumenda corporis, totam tempora eos delectus perferendis neque numquam debitis. Eius sit hic fuga reiciendis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet asperiores hic omnis expedita, cumque recusandae aspernatur debitis quam minima aliquid placeat iusto, corporis molestiae sed earum tenetur eveniet nostrum vero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, repellendus est ut repudiandae obcaecati saepe quos sed nulla rerum perspiciatis quasi soluta ullam facilis, harum quia! Nulla libero laboriosam nobis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;

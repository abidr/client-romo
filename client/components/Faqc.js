/* eslint-disable max-len */
import React from 'react';
import Faq from 'react-faq-component';
import { BiEnvelope } from 'react-icons/bi';

const data = {
  rows: [
    {
      title: 'Lorem ipsum dolor sit amet',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
    },
    {
      title: 'Nunc maximus, magna at ultricies elementum',
      content:
                'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
    },
    {
      title: 'Curabitur laoreet, mauris vel blandit fringilla',
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
    {
      title: 'What is the package version',
      content: <p>current version is 1.2.1</p>,
    }, {
      title: 'Lorem ipsum dolor sit amet',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
    },
  ],
};

const Faqc = () => (
  <>
    <section className="section-padding bg-black2" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-12 col-12">
            <div className="section-title">
              <h2>Faq Questions</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad architecto totam dolores? Dignissimos, velit, maiores excepturi quasi atque qui voluptatum delectus veniam nam iure eveniet quo officiis distinctio deserunt. Incidunt!</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae sapiente dolorem magni? Ipsam possimus corporis dolorum iusto maiores quae reiciendis debitis magnam ullam atque soluta</p>
              <a href="/#" className="bttn-mid btn-ylo">
                <BiEnvelope />
                Contact Us
              </a>
            </div>
          </div>
          <div className="col-xl-7 col-md-12 col-12">
            <div className="faq-area">
              <Faq
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Faqc;

import React from 'react';
import AboutSection from './AboutSection';
import BannerSection from './BannerSection';
import ContactSection from './ContactSection';
import HeadingBlock from './HeadingBlock';
import PageTitle from './PageTitle';
import TextBlock from './TextBlock';

const ComponentPicker = ({ type, data }) => {
  switch (type) {
    case 'PageTitle':
      return <PageTitle data={data} />;
    case 'TextBlock':
      return <TextBlock data={data} />;
    case 'HeadingBlock':
      return <HeadingBlock data={data} />;
    case 'ContactSection':
      return <ContactSection data={data} />;
    case 'AboutSection':
      return <AboutSection data={data} />;
    case 'BannerSection':
      return <BannerSection data={data} />;
    default:
      return <></>;
  }
};

export default ComponentPicker;

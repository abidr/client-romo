import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import Head from 'next/head';
import React from 'react';
import About from '../components/About';
import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Faqc from '../components/Faqc';
import Features from '../components/Features';
import Howitworks from '../components/HowItWorks';
import Solutions from '../components/Solutions';
import Footer from '../components/ui/Footer';
import SiteHeader from '../components/ui/SiteHeader';

export default function Home({
  logo, site, tagline, mainMenu, footerMenu, apiUrl
}) {
  return (
    <div>
      <Head>
        <title>
          {site?.param1}
          {' '}
          -
          {' '}
          {tagline?.param1}
        </title>
        <link rel="icon" href={`${apiUrl.param1}/public/${logo.param2}`} />
      </Head>
      <SiteHeader logo={logo} apiUrl={apiUrl} mainMenu={mainMenu} />
      <Banner />
      <Features />
      <About />
      <Solutions />
      <Howitworks />
      <Faqc />
      <Contact />
      <Footer site={site} footerMenu={footerMenu} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const { data } = await axios.get(`${origin}/api/info`);
  return {
    props: {
      logo: data?.logo,
      site: data?.site,
      tagline: data?.tagline,
      apiUrl: data?.apiUrl,
      mainMenu: JSON.parse(data.mainMenu.param1),
      footerMenu: JSON.parse(data.footerMenu.param1)
    }
  };
}

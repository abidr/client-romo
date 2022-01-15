import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ComponentPicker from '../components/ui/editor/ComponentPicker';
import Footer from '../components/ui/Footer';
import SiteHeader from '../components/ui/SiteHeader';

export default function Page({
  pageData, logo, site, mainMenu, footerMenu, apiUrl, info
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Head>
        <title>
          {pageData?.name || t('404 Not Found')}
          {' '}
          -
          {' '}
          {site?.param1}
        </title>
        <link rel="icon" href={`${apiUrl.param1}/public/${logo.param2}`} />
      </Head>
      <SiteHeader logo={logo} apiUrl={apiUrl} mainMenu={mainMenu} />
      {pageData?.content?.map((comp, index) => (
        <ComponentPicker
          key={String(index)}
          type={comp?.component}
          data={comp?.data}
          info={info}
        />
      ))}
      <Footer site={site} footerMenu={footerMenu} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { slug } = context.params;
  const { origin } = absoluteUrl(req);
  const { data: pageData } = await axios.get(`${origin}/api/pages/${slug}`);
  const { data } = await axios.get(`${origin}/api/info`);
  if (!pageData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pageData,
      logo: data?.logo,
      site: data?.site,
      apiUrl: data?.apiUrl,
      mainMenu: JSON.parse(data.mainMenu.param1),
      footerMenu: JSON.parse(data.footerMenu.param1),
      info: data
    }
  };
}

import 'bootstrap/dist/css/bootstrap.min.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { SWRConfig } from 'swr';
import request from '../config/api';
import '../styles/global.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const fetcher = (url) => request.get(url).then((r) => r.data);

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
export default MyApp;

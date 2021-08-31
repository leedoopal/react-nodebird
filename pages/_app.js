import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';

// index.js의 부모. pages들의 공통 부분
const App = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Head>
      <meta charSet="utf-8" />
      <title>Cindy NodeBird</title>
    </Head>
    <Component {...pageProps} />
  </RecoilRoot>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;

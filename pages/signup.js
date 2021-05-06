import React from 'react';
import Head from 'next/head';

import AppLayout from "../components/AppLayout";

const Signup = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | Cidny NodeBird</title>
      </Head>
      <AppLayout>회원가입 페이지</AppLayout>
    </>
  )
};

export default Signup;
import React from 'react';
import { RecoilRoot } from 'recoil';

import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
    <RecoilRoot>
      <AppLayout>
        <div>Hello Next!</div>
      </AppLayout>
    </RecoilRoot>
  )
}

export default Home;

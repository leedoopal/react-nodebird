import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';

import { userFollowerList, userFollowingList, userMe } from '../stores/user';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import FollowerList from '../components/FollowerList';

const Profile = () => {
  const followingList = useRecoilValue(userFollowingList);
  const followerList = useRecoilValue(userFollowerList);
  const me = useRecoilValue(userMe);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me, me?.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | Cidny NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowerList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;

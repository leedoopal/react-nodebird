import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRecoilState } from 'recoil';

import { userMe } from '../stores/user';
import {
  getFollowersAction,
  getFollowingsAction,
  loadUserAction,
} from '../server/api/user';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import FollowerList from '../components/FollowerList';

const Profile = () => {
  const [me, setUserMe] = useRecoilState(userMe);

  useEffect(async () => {
    if (!me) {
      const data = await loadUserAction();

      if (data?.id) {
        await setUserMe(data);
      } else {
        Router.push('/');
      }
    }
  }, [me]);

  useEffect(async () => {
    const followingsList = await getFollowingsAction();
    const followersList = await getFollowersAction();
    const updateMe = {
      ...me,
      Followings: followingsList,
      Followers: followersList,
    };
    if (me) setUserMe(updateMe);
  }, []);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | {me.nickname} NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me.Followings} />
        <FollowerList header="팔로워 목록" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;

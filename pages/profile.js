import React, { useEffect, useState, useCallback } from 'react';
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

const Profile = () => {
  const [me, setUserMe] = useRecoilState(userMe);

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  useEffect(async () => {
    if (!me) {
      const { data } = await loadUserAction();
      await setUserMe(data);

      if (!data) return Router.push('/');
    }

    if (me?.id) {
      await setUserMe(me);

      const followingsList = await getFollowingsAction({
        limit: followingsLimit,
      });
      const followersList = await getFollowersAction({ limit: followersLimit });

      const updateMe = {
        ...me,
        Followings: followingsList,
        Followers: followersList,
      };

      if (me) setUserMe(updateMe);
    }
  }, [me?.id]);

  useEffect(async () => {
    const data = await getFollowingsAction({ limit: followingsLimit });

    if (me) {
      const updateMe = {
        ...me,
        Followings: data,
        Followers: me.Followers,
      };
      setUserMe(updateMe);
    }
  }, [followingsLimit]);

  useEffect(async () => {
    const data = await getFollowersAction({ limit: followersLimit });

    if (me) {
      const updateMe = {
        ...me,
        Followings: me.Followings,
        Followers: data,
      };
      setUserMe(updateMe);
    }
  }, [followersLimit]);

  const loadMoreFollowings = useCallback(async () => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(async () => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return <div>내 정보를 로딩중이예요</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | {me.nickname} NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          headerKey="following"
          data={me.Followings}
          onClickMore={loadMoreFollowings}
        />
        <FollowList
          header="팔로워 목록"
          headerKey="follower"
          data={me.Followers}
          onClickMore={loadMoreFollowers}
        />
      </AppLayout>
    </>
  );
};

export default Profile;

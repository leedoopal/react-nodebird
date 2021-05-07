import React from 'react';
import Head from 'next/head';

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import FollowerList from "../components/FollowerList";

const Profile = () => {
  const followList = [{ nickname: "나이키" }, { nickname: "cindy" }, { nickname: "아디다스" }];
  const followerList = [{ nickname: "나이키" }, { nickname: "cindy" }, { nickname: "아디다스" }];

  return (
    <>
      <Head>
        <title>내 프로필 | Cidny NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followList} />
        <FollowerList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  )
}

export default Profile;

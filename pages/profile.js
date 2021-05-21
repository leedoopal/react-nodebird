import React from "react";
import Head from "next/head";
import { useRecoilValue } from "recoil";

import { userFollowerList, userFollowingList } from "../stores/user";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import FollowerList from "../components/FollowerList";

const Profile = () => {
  const followingList = useRecoilValue(userFollowingList);
  const followerList = useRecoilValue(userFollowerList);

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

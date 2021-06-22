import React, { useCallback } from 'react';

import { Avatar, Card, Button } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userMe,
  userIsSignedIn,
  userFollowingList,
  userFollowerList,
} from '../stores/user';
import { userSignOutAction } from '../server/api/user';
import { currentMainPosts } from '../stores/post';

const UserProfile = () => {
  const me = useRecoilValue(userMe);
  const setIsSignedIn = useSetRecoilState(userIsSignedIn);
  const isSignedIn = useRecoilValue(userIsSignedIn);
  const mainPosts = useRecoilValue(currentMainPosts);
  const followingList = useRecoilValue(userFollowingList);
  const followerList = useRecoilValue(userFollowerList);

  const onSignOut = useCallback(async () => {
    // const data = await userSignOutAction();
    setIsSignedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          {' '}
          <br />
          {' '}
          {mainPosts.length}
        </div>,
        <div key="followings">
          팔로잉
          {' '}
          <br />
          {' '}
          {(followingList && followingList.length) || 0}
        </div>,
        <div key="followings">
          팔로워
          {' '}
          <br />
          {' '}
          {(followerList && followerList.length) || 0}
        </div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={onSignOut} loading={!isSignedIn}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;

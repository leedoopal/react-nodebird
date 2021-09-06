import React, { useCallback } from 'react';

import { Avatar, Card, Button } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userMe, userIsSignedIn } from '../stores/user';
import { signOutAction } from '../server/api/user';
import { currentMainPosts } from '../stores/post';

const UserProfile = () => {
  const me = useRecoilValue(userMe);
  const setIsSignedIn = useSetRecoilState(userIsSignedIn);
  const mainPosts = useRecoilValue(currentMainPosts);

  const onSignOut = useCallback(async () => {
    await signOutAction();
    setIsSignedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹 <br /> {mainPosts.length}
        </div>,
        <div key="followings">
          팔로잉 <br /> {(me.Followings && me.Followings.length) || 0}
        </div>,
        <div key="followings">
          팔로워 <br /> {(me.Followers && me.Followers.length) || 0}
        </div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={onSignOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;

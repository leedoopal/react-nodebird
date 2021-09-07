import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Link from 'next/link';

import { Avatar, Card, Button } from 'antd';

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
          <Link href={`/user/${me.id}`}>
            <a>
              짹짹 <br /> {mainPosts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉 <br /> {(me.Followings && me.Followings.length) || 0}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워 <br /> {(me.Followers && me.Followers.length) || 0}
            </a>
          </Link>
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

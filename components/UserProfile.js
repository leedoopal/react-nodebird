import React, { useCallback } from "react";

import { Avatar, Card, Button } from "antd";
import { userMe, userIsSignedIn } from "../stores/user";
import { userSignOutAction } from "../server/api/user";
import { useRecoilValue } from "recoil";

const UserProfile = () => {
  const me = useRecoilValue(userMe);
  const setIsSignedIn = useRecoilValue(userIsSignedIn);
  const onSignOut = useCallback(() => {
    userSignOutAction();
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹 <br /> 0
        </div>,
        <div key="followings">
          팔로잉 <br /> 0
        </div>,
        <div key="followings">
          팔로워 <br /> 0
        </div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={onSignOut} loading={setIsSignedIn}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;

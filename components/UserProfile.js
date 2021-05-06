import React, { useCallback } from 'react';
import PropTypes from "prop-types";

import { Avatar, Card, Button } from 'antd';

const UserProfile = ({ setIsSignedIn }) => {
  const onSignOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  return (
    <Card actions={[
      <div key="twit">짹짹 <br /> 0</div>,
      <div key="followings">팔로잉 <br /> 0</div>,
      <div key="followings">팔로워 <br /> 0</div>
    ]}>
      <Card.Meta title="cindy" avatar={<Avatar>CINDY</Avatar>} />
      <Button onClick={onSignOut}>로그아웃</Button>
    </Card>
  )
}

UserProfile.propTypes = {
  setIsSignedIn: PropTypes.elementType.isRequired
}

export default UserProfile;
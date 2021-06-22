import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { userFollowingList, userMe } from '../stores/user';

const FollowButton = ({ post }) => {
  const me = useRecoilValue(userMe);
  const [followingList, setFollowingList] = useRecoilState(userFollowingList);
  const isFollowing = me
    && followingList
    && followingList.find((v) => v.nickname === post.user.nickname);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      // setFollowingList();
    } else {
      setFollowingList(followingList.concat(post.user));
    }
  }, [followingList]);

  return (
    <>
      <Button onClick={onClickButton}>Follow</Button>
    </>
  );
};

FollowButton.propTypes = {
  post: {
    mainPosts: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      comments: PropTypes.arrayOf(PropTypes.object),
      images: PropTypes.arrayOf(PropTypes.object),
    }),
  },
};

export default FollowButton;

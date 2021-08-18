import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { userMe } from '../stores/user';
import { followUpdateAction } from '../server/api/user';

const FollowButton = ({ post }) => {
  const [me, setUserMe] = useRecoilState(userMe);

  const isFollowing = me && me.Followings?.find((v) => v.id === post.UserId);

  const onClickButton = useCallback(async () => {
    if (isFollowing) {
      await followUpdateAction({ method: 'DELETE', userId: post.UserId });

      const filterFollowings = me.Followings.filter(
        (v) => v.id !== post.UserId,
      );
      const updateMe = { ...me, Followings: filterFollowings };

      setUserMe(updateMe);
    } else {
      await followUpdateAction({ method: 'PATCH', userId: post.UserId });

      const addFollowings = me.Followings.concat({ id: post.UserId });
      const updateMe = { ...me, Followings: addFollowings };

      setUserMe(updateMe);
    }
  }, [isFollowing]);

  // 본인 포스트인 경우 팔로우버튼 숨김
  if (post.UserId === me.id) {
    return null;
  }

  return (
    <>
      <Button onClick={onClickButton}>
        {isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </>
  );
};

FollowButton.propTypes = {
  // eslint-disable-next-line react/require-default-props
  post: {
    mainPosts: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      comments: PropTypes.arrayOf(PropTypes.object),
      images: PropTypes.arrayOf(PropTypes.object),
    }),
    UserId: PropTypes.number,
  },
};

export default FollowButton;

import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { followerDeleteAction, followUpdateAction } from '../server/api/user';
import { userMe } from '../stores/user';

const FollowList = ({ header, headerKey, data, onClickMore }) => {
  const [me, setUserMe] = useRecoilState(userMe);
  const headerText = headerKey === 'following' ? '언팔로잉' : '언팔로우';

  const onClick = async (id) => {
    if (headerKey === 'following') {
      await followUpdateAction({ method: 'DELETE', userId: id });

      const filterFollowings = me.Followings.filter((v) => v.id !== id);
      const updateMe = { ...me, Followings: filterFollowings };
      setUserMe(updateMe);
    } else if (headerKey === 'follower') {
      await followerDeleteAction({ id });

      const filterFollowers = me.Followers.filter((v) => v.id !== id);
      const updateMe = { ...me, Followers: filterFollowers };
      setUserMe(updateMe);
    }
  };

  return (
    <div>
      <h3>{header}</h3>
      {data &&
        data.map((v) => (
          <div key={v.id}>
            <span>{v.nickname}</span>
            <button type="button" onClick={() => onClick(v.id)}>
              {headerText} 하기
            </button>
          </div>
        ))}
      <button type="button" onClick={onClickMore}>
        더보기
      </button>
    </div>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  headerKey: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
};

export default FollowList;

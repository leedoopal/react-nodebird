import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import { followUpdateAction } from '../server/api/user';
import { userMe } from '../stores/user';

const FollowList = ({ header, data }) => {
  const [me, setUserMe] = useRecoilState(userMe);

  const onClick = async (id) => {
    await followUpdateAction({ method: 'DELETE', userId: id });

    const filterFollowings = me.Followings.filter((v) => v.id !== id);
    const updateMe = { ...me, Followings: filterFollowings };
    setUserMe(updateMe);
  };

  return (
    <>
      <div>
        <h3>{header}</h3>
        {data &&
          data.map((v) => (
            <div key={v.id}>
              <span>{v.nickname}</span>
              <button type="button" onClick={() => onClick(v.id)}>
                언팔로우 하기
              </button>
            </div>
          ))}
        <button type="button">더보기</button>
      </div>
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

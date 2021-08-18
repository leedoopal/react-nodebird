import React from 'react';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => (
  <>
    <div>
      <h3>{header}</h3>
      {data.map((v) => (
        <div key={v.id}>{v.nickname}</div>
      ))}
      <button type="button">더보기</button>
    </div>
  </>
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

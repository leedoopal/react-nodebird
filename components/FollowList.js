import React from 'react';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => {
  return (
    <>
      <div>
        <h3>{header}</h3>
        {data.map((v, i) => {
          return (
            <div key={i}>{v.nickname}</div>
          )
        })}
        <button>더보기</button>
      </div>
    </>
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default FollowList;
import React from 'react';
import PropTypes from 'prop-types';

const FollowerList = ({ header, data }) => (
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

FollowerList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowerList;

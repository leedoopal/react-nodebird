import React from 'react';
import PropTypes from 'prop-types';

const PostCardContent = ({ postContentData }) => <div>{postContentData}</div>;

PostCardContent.propTypes = {
  postContentData: PropTypes.string.isRequired,
};

export default PostCardContent;

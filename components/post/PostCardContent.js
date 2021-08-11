import React from 'react';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => <div>{postData.content}</div>;

PostCardContent.defaultProps = {
  postData: {
    content: PropTypes.string.isRequired,
  },
};

export default PostCardContent;

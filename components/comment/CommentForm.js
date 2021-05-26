import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import shortID from 'shortid';

import { Form, Button, Input } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useInput from '../../hooks/useInput';
import { userMe } from '../../stores/user';
import { updateMainPostComment, currentMainPosts } from '../../stores/post';

const CommentForm = ({ post }) => {
  const email = useRecoilValue(userMe)?.email;
  const setMainPostComment = useSetRecoilState(updateMainPostComment);
  const getMainPosts = useRecoilValue(currentMainPosts);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    const newComment = {
      id: shortID.generate(),
      content: commentText,
      user: {
        id: shortID.generate(),
        postID: post.id,
        email: 'cindy',
        nickname: 'cindy',
      },
    };
    setMainPostComment(newComment);
    setCommentText('');
    // getMainPosts[findPostIndex].comments.push(newComment);
    // updateMainPostComment(getMainPosts);
  }, [commentText]);

  return (
    <Form>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          rows={4}
          onChange={onChangeCommentText}
        />
        <Button type="primary" onClick={onSubmitComment}>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
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

export default CommentForm;

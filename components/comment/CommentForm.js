import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import shortID from 'shortid';

import { Form, Button, Input } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useInput from '../../hooks/useInput';
import { updateMainPost } from '../../stores/post';
import { userMe } from '../../stores/user';
import { addCommentAction, loadPostAction } from '../../server/api/post';

const CommentForm = ({ post }) => {
  const me = useRecoilValue(userMe);
  const setUpdateMainPost = useSetRecoilState(updateMainPost);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(async () => {
    const newComment = {
      id: shortID.generate(),
      content: commentText,
      user: {
        id: me.id,
        email: me.email,
        nickname: me.nickname,
        postId: post.id,
      },
    };

    await addCommentAction(newComment);

    setUpdateMainPost(await loadPostAction({ postId: post.id }));
    setCommentText('');
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

CommentForm.defaultProps = {
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

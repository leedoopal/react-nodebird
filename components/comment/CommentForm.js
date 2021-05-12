import React, { useCallback } from 'react';
import PropTypes from "prop-types";

import { Form, Button, Input } from 'antd';
import useInput from "../../hooks/useInput";
import { useRecoilValue } from "recoil";
import { userMe } from "../../stores/user";

const CommentForm = ({ post }) => {
  const id = useRecoilValue(userMe)?.id;
  const [commentText, setCommentText] = useInput('');
  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} rows={4}
                        onChange={setCommentText} />
        <Button type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes =
  {
    post: {
      mainPosts: PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        comments: PropTypes.arrayOf(PropTypes.object),
        images: PropTypes.arrayOf(PropTypes.object),
      }).isRequired
    }
  }


export default CommentForm;
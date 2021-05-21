import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Form, Button, Input } from "antd";
import useInput from "../../hooks/useInput";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userMe } from "../../stores/user";
import { updateMainPostComment, updateMainPosts } from "../../stores/post";

const CommentForm = ({ post }) => {
  const email = useRecoilValue(userMe)?.email;
  const setMainPostComment = useSetRecoilState(updateMainPostComment);
  const getMainPosts = useRecoilValue(updateMainPosts);
  const [commentText, setCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    const newComment = {
      content: commentText,
      postID: post.id,
      email: "cindy",
    };
    setMainPostComment(newComment);
    // getMainPosts[findPostIndex].comments.push(newComment);
    // updateMainPostComment(getMainPosts);
    console.log(getMainPosts);
  }, [commentText]);

  return (
    <Form>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          rows={4}
          onChange={setCommentText}
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
    }).isRequired,
  },
};

export default CommentForm;

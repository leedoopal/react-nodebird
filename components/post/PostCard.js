import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import { Card, Popover, Button, Avatar } from "antd";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined
} from "@ant-design/icons";

import { userMe } from "../../stores/user";
import PostImage from "../post/PostImage";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState('');
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, [liked]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);
  const id = useRecoilValue(userMe)?.id;

  return (
    <div>
      <Card cover={post.images && <PostImage images={post.images} />}
            actions={[
              <RetweetOutlined key="retweet" />,
              liked ? <HeartTwoTone twoToneColor="eb2f96" key="heartTwo"
                                    onClick={onToggleLike} /> :
                <HeartOutlined key="heart" onClick={onToggleLike} />
              ,
              <MessageOutlined key="comment" onClick={onToggleComment} />,
              <Popover key="more" content={(
                <Button.Group>
                  {post.user.id === id ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  ) : <Button>신고</Button>}
                </Button.Group>
              )}>
                <EllipsisOutlined />
              </Popover>
            ]}>
        <Card.Meta avatar={<Avatar>{post.user.nickname[0]}</Avatar>}
                   title={post.user.nickname} description={post.content} />
      </Card>
      {commentFormOpened && (
        <div>
          댓글 넣을 곳
        </div>
      )}
    </div>
  )
}

PostCard.propTypes =
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

export default PostCard;
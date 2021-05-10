import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";

import { Card, Popover, Button, Avatar } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined
} from "@ant-design/icons";

import { userMe } from "../../stores/user";
import PostImage from "../post/PostImage";

const PostCard = ({ post }) => {
  const id = useRecoilValue(userMe)?.id;
  console.log('id: ', id);

  return (
    <div>
      <Card cover={post.images && <PostImage images={post.images} />}
            actions={[
              <RetweetOutlined key="retweet" />,
              <HeartOutlined key="heart" />,
              <MessageOutlined key="comment" />,
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
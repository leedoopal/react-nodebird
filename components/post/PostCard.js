import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Card, Popover, Button, Avatar, List } from 'antd';
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import { userMe } from '../../stores/user';
import { deleteMainPost } from '../../stores/post';
import PostImage from './PostImage';
import PostCardContent from './PostCardContent';
import FollowButton from '../FollowButton';
import CommentForm from '../comment/CommentForm';
import { deletePostAction, likeTogglePostAction } from '../../server/api/post';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState('');
  const onToggleLike = useCallback(async () => {
    await likeTogglePostAction({ postId: post.id, liked });

    setLiked((prev) => !prev);
  }, [liked]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);

  const me = useRecoilValue(userMe);
  const deletePost = useSetRecoilState(deleteMainPost);

  const { user } = post.content;

  async function deletePostHandler() {
    await deletePostAction({ postId: post.id });
    deletePost(post);
  }

  function updateComments() {
    return post.Comments?.map((v) => JSON.parse(v.content));
  }

  let comments = updateComments();

  useEffect(() => {
    comments = updateComments();
  }, [post.Comments]);

  useEffect(() => {
    post.Likers.find((v) => {
      if (v.Like.PostId === post.id && v.Like.UserId === me.id) {
        setLiked(true);
      }
      return false;
    });
  }, []);

  return (
    <div>
      <Card
        cover={post.images && <PostImage images={post.images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="eb2f96"
              key="heartTwo"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {me.id && post.UserId === me.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={deletePostHandler}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me.id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{user?.nickname[0]}</Avatar>}
          title={user?.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={
              comments && comments.length > 0
                ? `${comments.length}개의 댓글`
                : '아직 댓글이 없어요'
            }
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <li>
                <span>{item.user.nickname}:</span>
                <span>{item.content}</span>
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  post: {
    mainPosts: PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      comments: PropTypes.arrayOf(PropTypes.object),
      Images: PropTypes.arrayOf(PropTypes.object),
      Likers: PropTypes.arrayOf(PropTypes.object),
    }),
  },
};

export default PostCard;

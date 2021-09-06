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
import {
  deletePostAction,
  likeTogglePostAction,
  retweetAction,
} from '../../server/api/post';

import PostImage from './PostImage';
import PostCardContent from './PostCardContent';
import FollowButton from '../FollowButton';
import CommentForm from '../comment/CommentForm';

const PostCard = ({ post }) => {
  const me = useRecoilValue(userMe);
  const deletePost = useSetRecoilState(deleteMainPost);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState('');

  const onToggleLike = useCallback(async () => {
    if (!me.id) {
      return alert('로그인이 필요합니다');
    }
    await likeTogglePostAction({ postId: post.id, liked });
    return setLiked((prev) => !prev);
  }, [liked, me?.id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);

  const onRetweet = useCallback(async () => {
    if (!me.id) {
      return alert('로그인이 필요합니다');
    }

    const data = await retweetAction({ id: post.id });
    if (data.message) {
      return alert(data.message);
    }
  }, [me?.id]);

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
    if (me) {
      post.Likers?.find((v) => {
        if (v.Like.PostId === post.id && v.Like.UserId === me.id) {
          setLiked(true);
        }
        return false;
      });
    }
  }, []);

  if (!me) {
    return null;
  }

  const CardMetaComponent = (type) => {
    const cardContentData =
      type === 'retweet' ? post.Retweet.content : post.content;

    return (
      <Card.Meta
        avatar={<Avatar>{post.User?.nickname[0]}</Avatar>}
        title={post.User?.nickname}
        description={
          typeof post.content === 'string' && (
            <PostCardContent postContentData={cardContentData} />
          )
        }
      />
    );
  };

  return (
    <div>
      <Card
        cover={post.Images.length > 0 && <PostImage images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
                {me?.id && post.UserId === me.id ? (
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
        title={post.RetweetId && `${post.User.nickname}님이 리트윗 했어요 ^.^`}
        extra={me.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images?.length > 0 && (
                <PostImage images={post.Retweet.Images} />
              )
            }
          >
            <CardMetaComponent type="Retweet" />
          </Card>
        ) : (
          <CardMetaComponent />
        )}
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
  post: {
    mainPosts: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      UserId: PropTypes.number,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.object),
      Images: PropTypes.arrayOf(PropTypes.object),
      Likers: PropTypes.arrayOf(PropTypes.object),
      Retweet: PropTypes.objectOf(PropTypes.any),
      RetweetId: PropTypes.number,
      Hashtags: PropTypes.objectOf(PropTypes.any),
    }),
  }.isRequired,
};

export default PostCard;

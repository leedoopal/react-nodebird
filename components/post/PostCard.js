import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
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
import CommentForm from '../comment/CommentForm';

const PostCard = ({ post }) => {
  console.log('post:', post);
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState('');
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, [liked]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [commentFormOpened]);
  const email = useRecoilValue(userMe)?.email;
  const deletePost = useSetRecoilState(deleteMainPost);

  function deletePostHandler() {
    deletePost(post);
  }

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
            content={(
              <Button.Group>
                {email && post.user.email === email ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={deletePostHandler}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.user?.nickname[0]}</Avatar>}
          title={post.user?.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={
              post.comments
                ? `${post.comments.length}개의 댓글`
                : '아직 댓글이 없어요'
            }
            itemLayout="horizontal"
            dataSource={post.comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.user.nickname}
                  avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                  content={item.content}
                />
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
      user: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      comments: PropTypes.arrayOf(PropTypes.object),
      images: PropTypes.arrayOf(PropTypes.object),
    }),
  },
};

export default PostCard;

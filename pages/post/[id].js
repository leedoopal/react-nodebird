import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import { loadUserAction } from '../../server/api/user';
import { loadPostAction } from '../../server/api/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/post/PostCard';
import { userMe } from '../../stores/user';

const Post = ({ serverData }) => {
  const setUserMe = useSetRecoilState(userMe);

  const router = useRouter();
  const { id } = router;
  const { me, post } = serverData;

  useEffect(() => {
    if (me?.id) {
      setUserMe(me);
    }
  }, []);

  if (!post.id) {
    return null;
  }

  return (
    <AppLayout>
      <Head>
        <title>{post.User.nickname}님의 글</title>
        <meta name="description" content={post.content} />
        <meta
          property="og:title"
          content={`${post.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={post.content} />
        <meta
          property="og:image"
          content={post.Images.length > 0 ? post.Images[0].src : ''}
        />
        <meta
          property="og:url"
          content={`https://cindt-nodebird.com/post/${id}`}
        />
      </Head>
      <PostCard post={post} />
    </AppLayout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';

  const data = await loadUserAction({ cookie });
  const serverData = {};

  if (data?.id) {
    serverData.me = data;
    serverData.post = await loadPostAction({ postId: params.id });
  }

  return {
    props: { serverData },
  };
};

Post.propTypes = {
  serverData: PropTypes.object.isRequired,
};

export default Post;

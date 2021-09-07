import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/post/PostCard';
import {
  currentMainPosts,
  loadMainPosts,
  initMainPosts,
} from '../../stores/post';
import { userMe } from '../../stores/user';
import { loadUserPostsAction } from '../../server/api/post';
import { loadUserAction } from '../../server/api/user';

const User = ({ serverData }) => {
  const { userInfo, posts } = serverData;

  const router = useRouter();
  const { id } = router.query;

  const [me, setUserMe] = useRecoilState(userMe);
  const mainPosts = useRecoilValue(currentMainPosts);
  const setLoadMainPosts = useSetRecoilState(loadMainPosts);
  const setInitMainPosts = useSetRecoilState(initMainPosts);

  useEffect(() => {
    if (userInfo?.id) {
      setUserMe(userInfo);
      setInitMainPosts([]);
      setLoadMainPosts(posts);
    }
  }, [id]);

  useEffect(() => {
    async function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        // 50개까지만 로드
        if (mainPosts.length < 50) {
          const postsData = await loadUserPostsAction({ lastId, userId: id });
          setLoadMainPosts(postsData);
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, id]);

  return (
    <AppLayout>
      {me && (
        <Head>
          <title>
            {me.nickname}
            님의 글
          </title>
          <meta name="description" content={`${me.nickname}님의 게시글`} />
          <meta property="og:title" content={`${me.nickname}님의 게시글`} />
          <meta
            property="og:description"
            content={`${me.nickname}님의 게시글`}
          />
          <meta
            property="og:image"
            content="https://nodebird.com/favicon.ico"
          />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';

  const data = await loadUserAction({ cookie });
  const serverData = {};

  if (data?.id) {
    serverData.userInfo = data;
    serverData.posts = await loadUserPostsAction({ userId: params.id });
  }

  return {
    props: { serverData },
  };
};

User.propTypes = {
  serverData: PropTypes.object.isRequired,
};

export default User;

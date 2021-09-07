import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';

import { userMe } from '../stores/user';
import { currentMainPosts, initMainPosts, loadMainPosts } from '../stores/post';
import { loadUserAction } from '../server/api/user';
import { loadPostsAction } from '../server/api/post';

const Home = ({ serverData }) => {
  const { userInfo, posts } = serverData;

  const [me, setUserMe] = useRecoilState(userMe);
  const setLoadMainPosts = useSetRecoilState(loadMainPosts);
  const setInitMainPosts = useSetRecoilState(initMainPosts);
  const mainPosts = useRecoilValue(currentMainPosts);

  useEffect(() => {
    if (userInfo?.id) {
      setUserMe(userInfo);
      setInitMainPosts([]);
      setLoadMainPosts(posts);
    }
  }, []);

  useEffect(() => {
    async function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        const lastId = mainPosts[mainPosts.length - 1]?.id;
        // 50개까지만 로드
        if (mainPosts.length < 50) {
          const postsData = await loadPostsAction({ query: lastId });
          setLoadMainPosts(postsData);
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts]);

  return (
    <AppLayout>
      {me?.id && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';

  const data = await loadUserAction({ cookie });
  const serverData = {};

  if (data?.id) {
    serverData.userInfo = data;
    serverData.posts = await loadPostsAction();
  }

  return {
    props: { serverData },
  };
};

Home.propTypes = {
  serverData: PropTypes.object.isRequired,
};

export default Home;

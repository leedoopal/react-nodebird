import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';

import { userIsSignedIn, userMe } from '../stores/user';
import { currentMainPosts, loadMainPosts } from '../stores/post';
import { loadUserAction } from '../server/api/user';
import { loadPostsAction } from '../server/api/post';

const Home = () => {
  const isSignedIn = useRecoilValue(userIsSignedIn);
  const setUserMe = useSetRecoilState(userMe);
  const setLoadMainPosts = useSetRecoilState(loadMainPosts);
  const mainPosts = useRecoilValue(currentMainPosts);

  useEffect(async () => {
    const data = await loadUserAction();
    if (data?.id) {
      await setUserMe(data);

      const postsData = await loadPostsAction();
      await setLoadMainPosts(postsData);
    }
  }, []);

  useEffect(() => {
    async function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        // 50개까지만 로드
        if (mainPosts.length < 50) {
          // const postsData = await loadPostsAction();
          // setLoadMainPosts(postsData);
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
      {isSignedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

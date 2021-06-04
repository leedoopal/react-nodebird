import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';

import { userIsSignedIn } from '../stores/user';
import { currentMainPosts, loadMainPosts } from '../stores/post';

const Home = () => {
  const isSignedIn = useRecoilValue(userIsSignedIn);
  const mainPosts = useRecoilValue(currentMainPosts);
  const setLoadMainPosts = useSetRecoilState(loadMainPosts);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight
        === document.documentElement.scrollHeight
      ) {
        // 50개까지만 로드
        if (mainPosts.length < 50) {
          setLoadMainPosts({});
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

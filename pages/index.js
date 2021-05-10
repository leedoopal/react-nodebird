import React from 'react';
import { useRecoilValue } from "recoil";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";

import { userIsSignedIn } from "../stores/user";
import { getMainPosts } from "../stores/post";

const Home = () => {
  const isSignedIn = useRecoilValue(userIsSignedIn);
  const mainPosts = useRecoilValue(getMainPosts);

  return (
    <AppLayout>
      {isSignedIn && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  )
}

export default Home;

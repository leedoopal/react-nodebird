import { atom, selector } from 'recoil';
import shortID from 'shortid';

export const postAtomKey = 'post';
export const postState = atom({
  key: postAtomKey,
  default: {
    mainPosts: [
      {
        id: 1,
        user: {
          id: 1,
          email: 'cindy',
          nickname: 'cindy',
        },
        content: '첫번째 게시글 #어쩌구#저쩌구',
        images: [
          {
            id: shortID.generate(),
            src: 'https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          },
          {
            id: shortID.generate(),
            src: 'https://images.unsplash.com/photo-1620205710247-65588efc1a24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          },
          {
            id: shortID.generate(),
            src: 'https://images.unsplash.com/photo-1620360576714-8301c750643b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          },
        ],
        comments: [
          {
            user: {
              email: 'kindy',
              nickname: 'kindy',
            },
            content: '뾰로롱',
          },
          {
            user: {
              email: 'panda',
              nickname: 'panda',
            },
            content: '쀼루룽',
          },
        ],
        imagePaths: [],
        postAdded: false,
      },
    ],
  },
});
export const currentMainPostsKey = 'post/addMainPost';
export const currentMainPosts = selector({
  key: currentMainPostsKey,
  get: ({ get }) => get(postState).mainPosts,
  set: ({ set }, newPost) => {
    set(postState, (prevPost) => ({
      mainPosts: [...prevPost.mainPosts, newPost],
    }));
  },
});
export const deleteMainPostkey = 'post/deleteMainPost';
export const deleteMainPost = selector({
  key: deleteMainPostkey,
  set: ({ set }, deletePost) => {
    set(postState, ({ mainPosts }) => ({
      mainPosts: mainPosts.filter((v) => v.id !== deletePost.id),
    }));
  },
});
export const mainPostCommentKey = 'post/mainPostComment';
export const updateMainPostComment = selector({
  key: mainPostCommentKey,
  set: ({ set }, newComment) => {
    set(postState, ({ mainPosts }) => {
      const findPostIndex = mainPosts.findIndex(
        (v) => v.id === newComment.user.postID,
      );
      return {
        mainPosts: mainPosts.map((v, i) => {
          if (i === findPostIndex) {
            return {
              ...v,
              comments: v.comments
                ? v.comments.concat(newComment)
                : [newComment],
            };
          }
          return v;
        }),
      };
    });
  },
});

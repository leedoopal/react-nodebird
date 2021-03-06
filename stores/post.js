import { atom, selector } from 'recoil';

export const postAtomKey = 'post';
export const postState = atom({
  key: postAtomKey,
  default: {
    mainPosts: [],
    imagePaths: [],
  },
});
export const currentMainPostsKey = 'post/addMainPost';
export const currentMainPosts = selector({
  key: currentMainPostsKey,
  get: ({ get }) => get(postState).mainPosts,
  set: ({ set }, newPost) => {
    set(postState, (prevPost) => ({
      mainPosts: [newPost, ...prevPost.mainPosts],
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
export const loadMainPostKey = 'post/loadMainPost';
export const loadMainPosts = selector({
  key: loadMainPostKey,
  set: ({ set }, newPosts) => {
    set(postState, ({ mainPosts }) => {
      if (mainPosts.length > 0) {
        return {
          mainPosts: [...mainPosts, ...newPosts],
        };
      }
      return { mainPosts: newPosts };
    });
  },
});
export const updateMainPostKey = 'post/updateMainPost';
export const updateMainPost = selector({
  key: updateMainPostKey,
  set: ({ set }, updatePost) => {
    set(postState, ({ mainPosts }) => ({
      mainPosts: mainPosts.map((v) => {
        if (v.id === updatePost.id) return updatePost;
        return v;
      }),
    }));
  },
});
export const initMainPostKey = 'post/initMainPost';
export const initMainPosts = selector({
  key: initMainPostKey,
  set: ({ set }) => {
    set(postState, () => ({ mainPosts: [] }));
  },
});
export const currentImagePathKey = 'post/currentImagePath';
export const currentImagePath = selector({
  key: currentImagePathKey,
  get: ({ get }) => get(postState).imagePaths,
  set: ({ set }, paths) => {
    set(postState, ({ mainPosts }) => ({
      mainPosts,
      imagePaths: paths,
    }));
  },
});

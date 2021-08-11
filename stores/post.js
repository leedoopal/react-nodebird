import { atom, selector } from 'recoil';
import shortID from 'shortid';
import faker from 'faker';

function setNewPosts() {
  return Array(10)
    .fill()
    .map(() => ({
      id: shortID.generate(),
      user: {
        id: shortID.generate(),
        email: '1233wsh@gmail.com',
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      images: [
        {
          id: shortID.generate(),
          src: faker.image.image(),
        },
      ],
      comments: [
        {
          user: {
            id: shortID.generate(),
            email: '1233wsh@gmail.com',
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));
}

export const postAtomKey = 'post';
export const postState = atom({
  key: postAtomKey,
  default: {
    // mainPosts: setNewPosts(),
    mainPosts: [],
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
export const loadMainPostKey = 'post/loadMainPost';
export const loadMainPosts = selector({
  key: loadMainPostKey,
  set: ({ set }, newPosts) => {
    set(postState, ({ mainPosts }) => {
      if (mainPosts.length) {
        return {
          mainPosts: mainPosts.filter(
            (v) => !newPosts.find(({ id }) => v.id === id),
          ),
        };
      }
      return { mainPosts: newPosts };
    });
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

import { atom, selector } from 'recoil';

export const postAtomKey = 'post';
export const postState = atom({
  key: postAtomKey,
  default: {
    mainPosts: [{
      id: 1,
      user: {
        id: 1,
        nickname: 'cindy'
      },
      content: '첫번째 게시글 #어쩌구#저쩌구',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        },
        {
          src: 'https://images.unsplash.com/photo-1620205710247-65588efc1a24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        },
        {
          src: 'https://images.unsplash.com/photo-1620360576714-8301c750643b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
      ],
      comments: [
        {
          user: {
            nickname: 'kindy'
          },
          content: '뾰로롱'
        },
        {
          user: {
            nickname: 'panda'
          },
          content: '쀼루룽'
        }
      ],
      imagePaths: [],
      postAdded: false
    }],
  }
});
export const getMainPostsKey = 'post/mainPost';
export const getMainPosts = selector({
  key: getMainPostsKey,
  get: ({ get }) => get(postState).mainPosts,
  set: ({ set }, newPost) => {
    set(postState, (prevPost) => {
      return { mainPosts: [...prevPost.mainPosts, newPost] }
    })
  }
});
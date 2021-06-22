import { atom, selector } from 'recoil';

export const userAtomKey = 'user';
export const userState = atom({
  key: userAtomKey,
  default: {
    isSignedIn: false,
    me: null,
    signUpData: {},
    signInData: {},
    followingList: [],
    followerList: [],
  },
});

export const userSignedInKey = 'user/isSignedIn';
export const userIsSignedIn = selector({
  key: userSignedInKey,
  get: ({ get }) => get(userState).isSignedIn,
  set: ({ set }, seq) => set(userState, { isSignedIn: seq }),
});
export const userMeKey = 'user/me';
export const userMe = selector({
  key: userMeKey,
  get: ({ get }) => get(userState).me,
  set: ({ set }, seq) => set(userState, { isSignedIn: true, me: seq }),
});
export const userFollowingListKey = 'user/followingList';
export const userFollowingList = selector({
  key: userFollowingListKey,
  get: ({ get }) => get(userState).followingList || [],
  set: ({ set }, newFollowingList) => {
    set(userState, (prevUserState) => ({
      ...prevUserState,
      followingList: newFollowingList,
    }));
  },
});
export const userFollowerListKey = 'user/followerList';
export const userFollowerList = atom({
  key: userFollowerListKey,
  default: [],
});

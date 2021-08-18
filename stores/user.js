import { atom, selector } from 'recoil';

export const userAtomKey = 'user';
export const userState = atom({
  key: userAtomKey,
  default: {
    isSignedIn: false,
    me: null,
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
export const userFollowerListKey = 'user/followerList';
export const userFollowerList = atom({
  key: userFollowerListKey,
  default: [],
});

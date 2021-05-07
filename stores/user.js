import { atom, selector } from 'recoil';

export const userAtomKey = 'user';
export const userState = atom({
  key: userAtomKey,
  default: {
    isSignedIn: false,
    user: null,
    signUpData: {},
    signInData: {}
  }
});

export const userSignedInKey = 'user/isSignedIn';
export const userIsSignedIn = selector({
  key: userSignedInKey,
  get: ({ get }) => get(userState).isSignedIn,
  set: ({ set }, seq) => set(userState, { isSignedIn: seq })
})
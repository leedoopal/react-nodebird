import { atom } from 'recoil';

export const userAtomKey = 'user';
export const userState = atom({
  key: userAtomKey,
  default: {}
})
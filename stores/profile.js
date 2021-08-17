import { atom } from 'recoil';

export const profileAtomKey = 'home';
export const profileState = atom({
  key: profileAtomKey,
  default: '',
});

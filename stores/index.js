import { userState } from './user';
import { profileState } from './profile';
import { postState } from './post';

export const stores = {
  user: userState,
  profile: profileState,
  post: postState
}
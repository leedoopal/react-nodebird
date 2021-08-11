import { signUpAction } from '../../server/api/user';

export const signUpApi = async (req) => {
  const data = await signUpAction(req);

  if (data.status === 403) {
    alert('이미 존재하는 이메일 입니다');
  }

  return data.ok;
};

export default { signUpApi };

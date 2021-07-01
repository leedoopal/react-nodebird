import { signUpAction } from '../../server/api/user';

const api = async (req, res) => {
  const data = await signUpAction(req);
  console.log(res);
  res.status(200).json(data);
};

export default api;

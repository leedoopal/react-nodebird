import urls from '../../config/urls';

export const loadPostsAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/posts`, {
    method: 'GET',
    credentials: 'include',
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const addPostAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ data: req }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const addCommentAction = async (req) => {
  await fetch(`${urls.hostUrl}/post/${req.user.postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ data: req }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });
};

export default { addPostAction, addCommentAction };

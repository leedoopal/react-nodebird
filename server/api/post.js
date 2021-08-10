import urls from '../../config/urls';

export const addPostAction = async (req) => {
  await fetch(`${urls.hostUrl}/post`, {
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

export const addCommentAction = async (req) => {
  await fetch(`${urls.hostUrl}/post/${req.postId}/comment`, {
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

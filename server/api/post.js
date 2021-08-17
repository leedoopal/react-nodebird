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

export const loadPostAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post/${req.postId}`, {
    method: 'GET',
    credentials: 'include',
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

export const deletePostAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post/${req.postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res)
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const likeTogglePostAction = async (req) => {
  const method = req.liked ? 'DELETE' : 'POST';

  const data = await fetch(`${urls.hostUrl}/post/${req.postId}/like`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res)
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const addCommentAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post/${req.user.postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

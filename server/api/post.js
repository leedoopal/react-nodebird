import urls from '../../config/urls';

export const loadPostsAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/posts?lastId=${req?.lastId || 0}`, {
    method: 'GET',
    credentials: 'include',
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
    credentials: 'include',
    body: req,
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

export const uploadImagesAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post/images`, {
    method: 'POST',
    credentials: 'include',
    body: req,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const retweetAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/post/${req.id}/retweet`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const loadUserPostsAction = async (req) => {
  const data = await fetch(
    `${urls.hostUrl}/user/${req.userId}/posts?lastId=${req.lastId || 0}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

export const loadHashtagPostsAction = async (req) => {
  const data = await fetch(
    `${urls.hostUrl}/hashtag/${encodeURIComponent(req.tag)}?lastId=${
      req.lastId || 0
    }`,
    {
      method: 'GET',
      credentials: 'include',
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    });

  return data;
};

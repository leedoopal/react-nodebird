import urls from '../../config/urls';

export const loadUserAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: req.cookie,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data;
};

export const updateUserNicknameAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/user/nickname`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data;
};

export const signInAction = async (req) =>
  (await fetch(`${urls.hostUrl}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log('user api error message: ', err);
    })) || {};

export const signOutAction = async () =>
  (await fetch(`${urls.hostUrl}/user/logout`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json().catch(() => null))
    .catch((err) => {
      console.log('user api error message: ', err);
    })) || {};

export const signUpAction = async (req) =>
  (await fetch(`${urls.hostUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(req),
  })
    .then((res) => res)
    .catch((err) => {
      console.log('user api error message: ', err);
    })) || {};

export const followUpdateAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/user/${req.userId}/follow`, {
    method: req.method,
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

export const followerDeleteAction = async (req) => {
  const data = await fetch(`${urls.hostUrl}/user/follower/${req.id}`, {
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

export const getFollowersAction = async () => {
  const data = await fetch(`${urls.hostUrl}/user/followers`, {
    method: 'GET',
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

export const getFollowingsAction = async () => {
  const data = await fetch(`${urls.hostUrl}/user/followings`, {
    method: 'GET',
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

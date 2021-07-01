import urls from '../../config/urls';

export const signInAction = async (req) => await fetch('/api/signIn', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ req }),
})
  .then((res) => res.json().catch(() => null))
  .catch((err) => {
    console.log('user api error message: ', err);
  }) || {};

export const signOutAction = async () => await fetch('/api/signOut', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})
  .then((res) => res.json().catch(() => null))
  .catch((err) => {
    console.log('user api error message: ', err);
  }) || {};

export const signUpAction = async (req) => (
  await fetch(`${urls.hostUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res)
    .catch((err) => {
      console.log('user api error message: ', err);
    }) || {}
);

export default { signInAction, signOutAction, signUpAction };

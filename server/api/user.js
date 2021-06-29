const signInAction = async (req) => await fetch('/api/signIn', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ req }),
})
  .then((res) => {
    console.log('signIn: ', res);
    return res.json().catch(() => null);
  })
  .catch((err) => {
    console.log('user api error message: ', err);
  });

const signOutAction = async () => await fetch('/api/signOut', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})
  .then((res) => res.json().catch(() => null))
  .catch((err) => {
    console.log('user api error message: ', err);
  });

const signUpAction = async (data) => await fetch(`${process.env.APP_BASE_URL}/user`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: data,
})
  .then((res) => res.json().catch(() => null))
  .catch((err) => {
    console.log('user api error message: ', err);
  });

export default { signInAction, signOutAction, signUpAction };

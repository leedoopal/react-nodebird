const userSignInAction = async (req) => {
  return await fetch("/api/signIn", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ req }),
  })
    .then((res) => {
      console.log("signIn: ", res);
      return res.json().catch(() => null);
    })
    .catch((err) => {
      console.log("user api error message: ", err);
    });
};

const userSignOutAction = async () => {
  return await fetch("/api/signOut", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => {
      return res.json().catch(() => null);
    })
    .catch((err) => {
      console.log("user api error message: ", err);
    });
};

export default { userSignInAction, userSignOutAction };

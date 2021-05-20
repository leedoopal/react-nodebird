const userSignIn = async (req) => {
  return await fetch("/api/signIn", {
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

const userSignOut = async (req) => {
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

export default { userSignIn, userSignOut };

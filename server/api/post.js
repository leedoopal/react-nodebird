const addPost = async (req) => {
  return await fetch("/api/post", {
    method: "POST",
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

export default { addPost };

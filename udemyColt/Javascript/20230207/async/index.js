const sing = async () => {
  throw new Error("lalal");
  return "LALALALA";
};

sing()
  .then((data) => {
    console.log("Promise resolved data:", data);
  })
  .catch((err) => {
    console.log("ERROR:", err);
  });

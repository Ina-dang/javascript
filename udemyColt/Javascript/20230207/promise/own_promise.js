const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    setTimeout(() => {
      if (randomNumber < 0.7) {
        resolve("YOUR FAKE DATA HERE");
      }
      reject("Request Error");
    }, 1000);
  });
};

fakeRequest("/dogs/1")
  .then((data) => {
    console.log("DONE WITH REQUEST", data);
  })
  .catch((err) => {
    console.log("OH NO ERROR! ", err);
  });

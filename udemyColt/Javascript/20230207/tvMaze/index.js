const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const response = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`
  );
  console.log(response.data[0].show.image.medium);
  const newImage = document.createElement("IMG");
  console.log(newImage);
  newImage.src = response.data[0].show.image.medium;
  document.body.append(newImage);
});

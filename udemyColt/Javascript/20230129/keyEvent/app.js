const h1 = document.querySelector("h1");
const input = document.querySelector("#username");

input.addEventListener("input", function () {
  const username = input.value;
  h1.innerText = `Welcome, ${username}`;
  if (username.length === 0) {
    h1.innerText = "Enter Your Username";
  }
});

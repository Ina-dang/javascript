const player1Button = document.querySelector("#player1button");
const player2Button = document.querySelector("#player2button");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const reset = document.querySelector("#reset");

let player1Score = 0;
let player2Score = 0;
let winningScore = 3;
let gameOver = false;

player1Button.addEventListener("click", function () {
  if (!gameOver) {
    player1Score += 1;
    if (player1Score === winningScore) {
      gameOver = true;
    }
    player1.textContent = player1Score;
  }
});

player2Button.addEventListener("click", function () {
  if (!gameOver) {
    player2Score += 1;
    if (player2Score === winningScore) {
      gameOver = true;
    }
    player2.textContent = player2Score;
  }
});

reset.addEventListener("click", function () {
  gameOver = false;
  player1Score = 0;
  player2Score = 0;
  player1.innerText = player1Score;
  player2.innerText = player2Score;
});

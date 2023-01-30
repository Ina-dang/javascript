const playto = document.querySelector("#playto");
const resetButton = document.querySelector("#reset");

const p1 = {
  score: 0,
  button: document.querySelector("#player1button"),
  display: document.querySelector("#player1"),
};
const p2 = {
  score: 0,
  button: document.querySelector("#player2button"),
  display: document.querySelector("#player2"),
};

let winningScore = 3;
let gameOver = false;

function updateScore(player, opponent) {
  if (!gameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      gameOver = true;
      player.display.classList.add("has-text-success");
      opponent.display.classList.add("has-text-danger");
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener("click", function () {
  updateScore(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScore(p2, p1);
});

playto.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

resetButton.addEventListener("click", reset);

function reset() {
  gameOver = false;
  for (let player of [p1, p2]) {
    player.score = 0;
    player.display.textContent = 0;
    player.display.classList.remove("has-text-success", "has-text-danger");
    player.button.disabled = false;
  }
}

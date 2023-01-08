let maximum = parseInt(prompt("최대 숫자를 입력하세요!"));
while (!maximum) {
  maximum = parseInt(prompt("숫자 형식이 아닙니다!"));
}
const targetNum = Math.floor(Math.random() * maximum) + 1;

let guess = parseInt(prompt("숫자를 맞춰보세요!"));
let attempts = 1;

while (parseInt(guess) !== targetNum) {
  if (guess === null) break;
  attempts++;
  if (guess > targetNum) {
    guess = prompt("숫자가 큽니다! 더 작은 수를 입력하세요.");
  } else {
    guess = prompt("숫자가 작습니다! 더 큰 수를 입력하세요.");
  }
}
if (guess === null) {
  console.log(`${attempts - 1}번 시도 후 나갔습니다.`);
} else {
  console.log(`정답입니다! ${attempts}번 만에 맞췄네요!`);
}

// 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
// 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

// function solution(a, b) {
//   var answer = [a, b];
//   answer.sort((a, b) => a - b);
//   console.log(answer);
//   a = answer[0];
//   b = answer[1];
//   let answerSum = 0;
//   for (let index = a; index <= b; index++) {
//     answerSum += index;
//   }
//   return answerSum;
// }

function solution(a, b) {
  return ((a + b) * (Math.abs(b - a) + 1)) / 2;
}

console.log(solution(5, 3));

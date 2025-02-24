/**
 * 길이가 n이고, "수박수박수박수...."와 같은 패턴을 유지하는 문자열을 리턴하는 함수,
 * solution을 완성하세요. 예를들어 n이 4이면 "수박수박"을 리턴하고 3이라면 "수박수"를 리턴하면 됩니다.
 */

// function solution(n) {
//   var answer = "";
//   for (let index = 0; index < n; index++) {
//     answer += index % 2 === 0 ? "수" : "박";
//   }
//   return answer;
// }

function solution(n) {
  return "수박".repeat(n).slice(0, n);
}

console.log(solution(3));
console.log(solution(4));

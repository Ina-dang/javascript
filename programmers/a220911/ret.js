/**
 * array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.
 */

// function solution(arr, divisor) {
//   var answer = [];
//   var tmp = arr;
//   for (let index = 0; index < arr.length; index++) {
//     if (tmp[index] % divisor === 0) {
//       answer.push(arr[index]);
//     }
//   }
//   return answer.length > 1 ? answer.sort((a, b) => a - b) : [-1];
// }

function solution(arr, divisor) {
  var answer = arr.filter((it) => it % divisor === 0);
  return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1];
}

// console.log(solution([5, 9, 7, 10], 5)); //	[5, 10]
console.log(solution([3, 2, 6], 10)); //	[5, 10]

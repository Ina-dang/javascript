/**
 * 문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 
 * 각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 
 * 각 단어의 짝수번째 알파벳은 대문자로,
 * 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, 
 * solution을 완성하세요.
 */

// function solution(s) {
//     let arr = s.split(' ');
//     let answer = '';
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr[i].length; j++) {
//             if (j % 2 === 0) {
//                 answer = answer + arr[i][j].toUpperCase();
//             } else {
//                 answer = answer + arr[i][j].toLowerCase();
//             }
//         }
//         if (i < arr.length - 1) {
//             answer = answer + " ";
//         }
//     }
//     return answer;
// }

function solution(s) {
    return s.split(' ').map(e => e.split('').map((el, index) => index % 2 === 0 ? el.toUpperCase() : el.toLowerCase()).join('')).join(' ');
}

// 이런방식도있었다
// function solution(s) {
//     return s.toUpperCase().replace(/(\w)(\w)/g, function (a) { return a[0].toUpperCase() + a[1].toLowerCase(); })
// }

console.log(solution("try hello world"));
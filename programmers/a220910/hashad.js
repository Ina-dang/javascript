/**
 * 양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 
 * 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 
 * 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.
 */

//  function solution(x) {
//     // let answer = x % (Math.floor(x % 100 * 0.1) + (Math.floor(x % 10))) === 0;
//     let answer  = x.toString().split('').map(x=>parseInt(x)).reduce((acc,curr) => acc + curr);
//     return x % answer === 0;
// }

function solution(x) {
    let num = x;
    let sum = 0;
    while (x>0) {
        sum =+ x%10
        x = Math.floor(x/10);
    };

    return !(num%sum);
}
console.log(solution(15)); // 1 + 5 = 6 || 15 % 6 === 0


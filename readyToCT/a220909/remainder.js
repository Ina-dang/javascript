// 자연수 n이 매개변수로 주어집니다.
// n을 x로 나눈 나머지가 1이 되도록 하는 가장 작은 자연수 x를 return 하도록 solution 함수를 완성해주세요.
// 답이 항상 존재함은 증명될 수 있습니다.

// function solution(n) {
//     let answer = 0;
//     for (let index = 0; index < n; index++) {
//         if(n % index === 1){
//             answer = index;
//             return answer;
//         }
//     }
//     return answer;
// }

function solution(n, x = 1 ){
    while(x++){
        if(n % x === 1){
            return x;
        }
    }
}

console.log(solution(10));
console.log(solution(12));
// 자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

// function solution(n) {
//     var tmp = n.toString().split('').reverse();
//     var answer = [];
//     for (let index = 0; index < tmp.length; index++) {
//         answer.push(parseInt(tmp[index]));
//     }
//     return answer;
// }

function solution(n) {
    var arr = [];

    
    while (n>0){
        arr.push(n%10);
        n = Math.floor(n/10);
    }
    
    return arr;
}

console.log(solution(12345));

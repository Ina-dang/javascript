//정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

function solution(n) {
    var answer = 0;
    for (let index = 0; index <= n; index++) {
        if(n % index === 0){
            answer += index; 
        }
    }
    return answer;
}

console.log(solution(12)); //28
solution(5); //6
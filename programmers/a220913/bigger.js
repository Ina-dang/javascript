// 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
// s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

// function solution(s) {
//     var answer = s;
//     let tmp = [];
//     for (let i = 0; i < s.length; i++) {
//         tmp.push(answer.charAt(i));
//     }
//     return tmp.sort((a, b) => {
//         if (a < b) return 1;
//         if (a > b) return -1;
//         return 0;
//     }).join('');
// }

function solution(s) {
    return s
        .split("")
        .sort()
        .reverse()
        .join("");
}

console.log(solution("Zbcdefg"))//	"gfedcbZ"
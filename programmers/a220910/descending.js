function solution(n) {
    return n.toString().split('').sort((a,b)=>b-a).join('');
}
console.log(solution(118372)) //873211
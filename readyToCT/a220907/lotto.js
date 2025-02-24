function solution(lottos, win_nums) {
    const includeNo = lottos.filter(it => win_nums.includes(it)).length;
    const zero = lottos.filter(it => it === 0).length;
    const includeZero = includeNo + zero;
    console.log(includeNo)
    console.log(includeZero)
    
    var answer = [includeZero, includeNo];

    console.log(answer);

    return answer;
}

solution([44, 1, 0, 0, 31, 25],	[31, 10, 45, 1, 6, 19]);
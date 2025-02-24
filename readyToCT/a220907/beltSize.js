function solution(sizes) {
    // sizes.forEach( size => {
    //     size.sort((a, b) => a-b);
    // });

    // let w = sizes.map(it => it[0]);
    // let h = sizes.map(it => it[1]);
    // console.log(w, h)
    // var answer = Math.max(...w) * Math.max(...h);
    // return answer;

    // const maxWidth = Math.max(...sizes.map(card => Math.min(...card)));
    // console.log(maxWidth);

    // const maxHeight = Math.max(...sizes.map(card => Math.max(...card)));
    // console.log(maxHeight);
    // return maxWidth * maxHeight;

    const rotated = sizes.map(([w, h]) => w < h ? [h, w] : [w, h]);
    let maxSize = [0, 0];
    rotated.forEach(([w, h]) => {
        if (w > maxSize[0]) maxSize[0] = w;
        if (h > maxSize[1]) maxSize[1] = h;
    })
    
    return maxSize[0]*maxSize[1];
}

console.log(solution([[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]]));
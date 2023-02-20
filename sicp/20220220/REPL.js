/**
 * @description (REPL = read-evaluate-print loop)
 * 복잡한 표현식 문장이 주어져도 해석기는 항상 동일한 기본주기(cycle)로 작동한다.
 * 해석기는 사용자가 입력한 문장을 읽고, 평가하고, 결과를 출력하는 주기를 반복한다.
 */
console.log(3 * 2 * (3 - 5 + 4) + (27 / 6) * 10);

const size = 2;
console.log(5 * size);

const radius = 10;

// 복합연산
const circumference = 2 * Math.PI * radius;
console.log(circumference);

// 복합연산에 이름을 붙여 그 연산을 하나의 단위로 지칭하게 하는 함수선언은 상수선언보다 훨씬 강력한 추상화 기법이다.
// funtion 이름(매개변수){return 반환 표현식(함수 적용 값 산출);}
function circumference2(num) {
  return num * Math.PI * radius;
}

console.log(circumference2(4));
console.log(circumference2(4 + 7));
console.log(circumference2(circumference2(1)));
console.log(circumference2(circumference2(1)) + circumference2(1));

// square 자체를 또 다른 함수의 구축 요소로 사용 가능
function square(x) {
  return x * x;
}

// 스킴은 스네이크 많이쓰지만, 나는 카멜로 할거
function sumOfSquares(x, y) {
  return square(x) + y;
}

console.log(sumOfSquares(3, 9));

const a = 3;
const b = a + 1;
console.log(b > a && b < a * b ? b : a);
console.log(a === 4 ? 6 : b === 4 ? 6 + 7 + a : 25);
console.log(2 + (b > a ? b : a));
console.log((a > b ? a : a < b ? b : -1) * (a + 1));

// P67
console.log(5 + 4 + ((2 - (3 - (6 + 4 / 5))) / 3) * (6 - 2) * (2 - 7));

// TODO 세 개의 수를 받고 셋 중 가장 작은것을 제외한 두 수의 제곱들을 합한 결과를 돌려주는 함수
function smallest(x, y, z) {
  const arr = [x, y, z].sort((a, b) => b - a);
  console.log(arr);
  arr.pop();
  console.log(arr);
  return console.log(Math.pow(arr[0], 2) + Math.pow(arr[1], 2));
}
smallest(1, 7, 4);

// 함수 작동방식 이해
function plus(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function aPlusAbsB(a, b) {
  // 조건부표현식을 사용헤 plus함수 또는 minus함수가 결정됨
  // plus또는 minus에 들어갈 인자로 aPlusAbsB의 매개변수 사용
  return (b >= 0 ? plus : minus)(a, b);
}
console.log(aPlusAbsB(7, -10));

/**
 * 정상 순서 평가: 먼저 완전히 전개한 후 축약하는 평가방법
 * 인수 우선 평가: 먼저 인수들을 평가한 후 적용
 */

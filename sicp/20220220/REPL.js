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
  return console.log(num * Math.PI * radius);
}

circumference2(4);

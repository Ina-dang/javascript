/**
 *
 * 정수 배열을 정렬해서 반환하는 solution()함수 완성하기 - 시간복잡도 O(NlogN)
 *
 * 정수 배열의 길이는 2이상 10의 5승 이하.
 * 정수 배열의 각 데이터 값은 -100000 이상 100000 이하
 *
 */
function solution(arr) {
  return arr.sort((a, b) => a - b);
}

/**
 * sort 메서드는 배열을 정해진 규칙에 맞춰 정렬한다.
 * 정해진 규칙이란 sort함수에 인수로 전달한 익명함수를 말하며
 * sort 메서드는 아무런 조건이 없을 경우 데이터가 문자열이라고 가정하고 정렬한다.
 *
 * sort메서드는 기존 배열을 변경시키기때문에 만약 원본배열을 그대로 두고싶다면 ECMA2023ㅇ테 발표된 toSorted를 사용한다.
 */

// 버블 정렬[O(N2)] 정렬 알고리즘으로 배열 원소 정렬
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j + 1] < arr[j]) {
        const tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr;
}

// sort메서드와 버블정렬 연산시간차 구하기
function measureTime(callback, arr) {
  const start = Date.now();
  const result = callback(arr);
  const end = Date.now();
  return [end - start, result];
}

let arr = Array.from({ length: 10000 }, (_, k) => 10000 - k);
const [bubbleTime, bubbleResult] = measureTime(bubbleSort, arr);
console.log(`첫번째 코드 실행 시간: ${bubbleTime}ms`); // 58ms

arr = Array.from({ length: 10000 }, (_, k) => 10000 - k);
const [sortTime, sortResult] = measureTime(solution, arr);
console.log(`두번째 코드 실행 시간: ${sortTime}ms`); // 0ms

/**        --------------------------------------------------                        */

/**
 * 배열 제어하기[O(NlogN)]
 *
 * 정수 배열을 하나 받는다. 배열의 중복값제거 후 배열데이터를 내림차순으로 정렬 반환하는 solution2함수 구현
 */

function solution2(arr) {
  const uniqueArr = [...new Set(arr)]; //중복값 제거 (set=> 집합을 생성하는 자바스크립트 내장객체. 중복을 허용하지 않음, 이후 스프레드연산자를 통해 집합을 다시 배열로 변환)
  console.log(`uniqueArr: ${uniqueArr}`);

  return uniqueArr.sort((a, b) => b - a);
}

console.log(`solution2: ${solution2([4, 2, 2, 1, 3, 4, 2])}`);

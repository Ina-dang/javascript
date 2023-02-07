let variable = "hello";
console.log(variable);

variable = 1234;
console.log(variable);

const arr = [1, 2, 3, 4, 5];
const map = arr.map(function (x) {
  return x * 2;
});

console.log(map);

// const arr2 = [1, 2, 3, 4, 5];
// const condition = function (x) {
//   return x % 2 === 0;
// };
// const ex = function (array) {
//   return array.filter(condition);
// };

// console.log(ex(arr2));

const arr2 = [1, 2, 3, 4, 5];
const condition = function (x) {
  return x % 2 === 0;
};
const ex = function (array, condition) {
  return array.filter(condition);
};

console.log(ex(arr2, condition));

let sum = 0;
for (let index = 0; index <= 10; index++) {
  sum += index;
}
console.log(sum);

function add(sum, count) {
  sum += count;
  if (count > 0) {
    return add(sum, count - 1);
  } else {
    return sum;
  }
}

console.log(add(0, 10));

const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const reduceArr = arr3.reduce((prev, cur) => {
  return prev + cur;
});

console.log(reduceArr);

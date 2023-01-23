const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function print(element) {
  console.log(element);
}

numbers.forEach(print);
console.log(print(numbers[0]));
console.log(print(numbers[1]));

numbers.forEach(function (element) {
  console.log(element);
});

for (const element of numbers) {
  console.log(element);
}

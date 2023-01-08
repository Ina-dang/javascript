for (var i = 25; i >= 0; ) {
  // console.log(i);
  i -= 5;
}

const letters = "hello world";
for (letter of letters) {
  // console.log(letter);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //DON'T CHANGE THIS LINE PLEASE!

// WRITE YOUR LOOP BELOW THIS LINE:
for (result of numbers) {
  console.log(Math.pow(result, 2));
}

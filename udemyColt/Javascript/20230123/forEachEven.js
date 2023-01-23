const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

numbers.forEach(function (element) {
  element % 2 === 0 ? console.log(element) : null;
});

const movies = [
  {
    title: "Amadeus",
    score: 80,
  },
  {
    title: "Alian",
    score: 90,
  },
  {
    title: "Lost stars",
    score: 95,
  },
];

movies.forEach((element) => {
  console.log(element);
});

for (const element of movies) {
  console.log(`${element.title}의 평점은 ${element.score}`);
}

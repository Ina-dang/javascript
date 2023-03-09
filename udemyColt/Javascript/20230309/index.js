const mongoose = require('mongoose');

main()
  .then(() => console.log('MongoDB CONNECTED...'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);
// const amadeus = new Movie({
//   title: 'Amadeus',
//   year: 1986,
//   score: 9.2,
//   rating: 'R',
// });

//Return 반환. 한번에 DB대량 삽입할때. 이 메서드를 사용하면 save를 호출하지 않아도 된다.
Movie.insertMany([
  {
    title: 'Amadeus',
    year: 1986,
    score: 9.2,
    rating: 'R',
  },
  {
    title: 'Alian',
    year: 1979,
    score: 8.1,
    rating: 'R',
  },
  {
    title: 'The Iron Giant',
    year: 1999,
    score: 7.5,
    rating: 'PG',
  },
  {
    title: 'Stand By Me',
    year: 1986,
    score: 8.6,
    rating: 'R',
  },
])
  .then((data) => {
    console.log('데이터 삽입 성공!');
    console.log('--------------------');
    console.log(data);
  })
  .catch((err) => console.log(err));

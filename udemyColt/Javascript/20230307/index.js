const express = require('express');
const path = require('path');
const app = express();
const reddit = require('./data.json');

// 스타일시트 기본경로 지정
app.use(express.static(path.join(__dirname, 'assets')));

//EJS지정 (외에도 app.set은 여러가지 가능)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = reddit[subreddit];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('404', { subreddit });
  }
});

app.get('/cats', (req, res) => {
  const allCats = ['푸딩', '떼껄룩', '왕눈', '쿠키', '콜랑'];
  res.render('cats', { allCats });
});

app.get('/random', (req, res) => {
  const num = Math.floor(Math.random() * 10 + 1);
  res.render('random', { random: num });
});

app.listen(3000, () => {
  console.log('3000포트로 연결중입니다.');
});

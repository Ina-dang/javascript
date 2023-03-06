const express = require('express');
const app = express();
const port = 3000;

// app.use((req, res) => {
//   console.log('새로운 요청 획득');
//   // res.send('요청을 받았습니다. 응답을 보냅니다.');
//   // res.send({ color: 'red' });
//   res.send('<h1>여기는 나의 웹페이지</h1>');
// });

app.get('/', (req, res) => {
  console.log('메인 페이지!!');
  res.send('메인');
});

app.get('/r/:subreddit', (req, res) => {
  console.log(`서브 URL! /r/${req.params.subreddit}`);
  res.send(`${req.params.subreddit} 맛집`);
});

app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params;
  console.log(`서브 URL! ${subreddit}/${postId}`);
  res.send(`${req.params.subreddit} 맛집 추천 :: ${postId}`);
});

app.get('/cats', (req, res) => {
  console.log('고양이 페이지!!');
  res.send('야옹');
});

app.post('/cats', (req, res) => {
  console.log('post 고양이 페이지!!');
  res.send('애옹');
});

app.get('/dogs', (req, res) => {
  console.log('강아지 페이지!!');
  res.send('월월');
});

app.get('/search', (req, res) => {
  const { q } = req.query;
  console.log(req.query + '!!');
  if (!q) {
    res.send('검색 결과가 없습니다.');
  } else {
    res.send(`검색 결과:: ${q}`);
  }
});

app.get('*', (req, res) => {
  console.log('아무거나!!');
  res.send('암모고나 길을 잃었다');
});

app.listen(port, () => {
  console.log('3000포트 통신중...');
});

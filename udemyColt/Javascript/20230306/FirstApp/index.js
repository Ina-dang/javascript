const express = require('express');
const app = express();
const port = 3000;

app.use((req, res) => {
  console.log('새로운 요청 획득');
  // res.send('요청을 받았습니다. 응답을 보냅니다.');
  // res.send({ color: 'red' });
  res.send('<h1>여기는 나의 웹페이지</h1>');
});

app.listen(port, () => {
  console.log('3000포트 통신중...');
});

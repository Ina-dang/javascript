const express = require('express');
const app = express();

//EJS지정 (외에도 여러가지 가능)
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.listen(3000, () => {
  console.log('3000포트로 연결중입니다.');
});

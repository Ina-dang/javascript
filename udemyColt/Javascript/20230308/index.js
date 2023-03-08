const express = require('express');
const app = express();

app.get('/tacos', (req, res) => {
  res.send('GET /tacos 응답중..');
  console.log('GET /tacos 응답중..');
});

app.post('/tacos', (req, res) => {
  console.log('POST /tacos 응답중..');
});

app.listen(3000, () => {
  console.log('3000포트로 통신중..');
});

const express = require('express');
const app = express();
const port = 3000;

app.use(() => {
  console.log('새로운 요청 획득');
});

app.listen(port, () => {
  console.log('3000포트 통신중...');
});

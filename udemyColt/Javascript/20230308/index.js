const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
  {
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    username: 'Skyler',
    comment: 'I love it!',
  },
  {
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    username: 'Skyler',
    comment: 'I love it!',
  },
  {
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

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

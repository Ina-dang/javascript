const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
  {
    id: '1',
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: '2',
    username: 'Skyler',
    comment: 'I love it!',
  },
  {
    id: '3',
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: '4',
    username: 'Skyler',
    comment: 'I love it!',
  },
  {
    id: '5',
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/show', { id, comment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const oldComment = comments.find((c) => c.id === id);
  oldComment.comment = newCommentText;
  res.redirect('/comments');
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

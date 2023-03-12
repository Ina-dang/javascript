const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log('3000 Connected...');
});

app.get('/', (req, res) => {
  res.render('home');
});

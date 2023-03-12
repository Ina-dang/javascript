const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

main()
  .then(() => console.log('MongoDB CONECTED...'))
  .catch((error) => {
    console.log('[MongoDB ERROR...]:: + error');
  });

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  // res.send('전체 상품 페이지');
  res.render('products/index', { products });
  console.log(`전체 상품 페이지::', ${products}`);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // res.send(product);
  console.log(`product:: ${product}`);
  res.render('products/show', { product });
});

app.get('/', (req, res) => {
  res.send('메인 페이지');
  console.log('메인 페이지');
});

app.listen(3000, () => {
  console.log('3000포트 통신중...');
});

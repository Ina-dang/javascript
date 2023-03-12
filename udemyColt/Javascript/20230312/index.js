const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  // res.send('전체 상품 페이지');
  res.render('products/index', { products });
  console.log(`전체 상품 페이지::', ${products}`);
});

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect('/products');
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // res.send(product);
  console.log(`product:: ${product}`);
  res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
  console.log('edit!!');
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.get('/', (req, res) => {
  res.send('메인 페이지');
  console.log('메인 페이지');
});

app.listen(3000, () => {
  console.log('3000포트 통신중...');
});

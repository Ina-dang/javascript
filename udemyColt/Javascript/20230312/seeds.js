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

// 단일 데이터 저장
// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit',
// });
// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => console.log(e));

const seedProducts = [
  {
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit',
  },
  {
    name: 'Cucumber',
    price: 0.19,
    category: 'vegetable',
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit',
  },
  {
    name: 'Organic Celery',
    price: 1.59,
    category: 'fruit',
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy',
  },
];

// 다중 데이터 저장
Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

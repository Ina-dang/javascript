const mongoose = require('mongoose');

main()
  .then(() => console.log('MongoDB CONNECTED...'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/product', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  price: { type: Number },
  onSale: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model('Product', productSchema);
const bike = new Product({ name: 'Mountain Bike', price: 50000 });
bike
  .save()
  .then((data) => {
    console.log('DATA INIT...');
    console.log(data);
  })
  .catch((err) => {
    console.log('DATA INIT FAILED');
    console.log(err);
  });

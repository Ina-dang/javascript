const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, '[CONNECTION ERROR]::'));
db.once('open', () => console.log('Database Connected'));

const makingName = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${makingName(descriptors)} ${makingName(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description:
        '군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 농업생산성의 제고와 농지의 합리적인 이용을 위하거나 불가피한 사정으로 발생하는 농지의 임대차와 위탁경영은 법률이 정하는 바에 의하여 인정된다.',
      price: price,
    });
    await camp.save();
    console.log(camp);
  }
};

seedDB().then(() => mongoose.disconnect());

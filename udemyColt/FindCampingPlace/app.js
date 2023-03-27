const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const methodOverride = require('method-override');
const morgan = require('morgan');

const catchAsync = require('./utils/catchAsync');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const { campgroundSchema } = require('./schemas');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database Connected'));

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method.toUpperCase(), req.path);
  next();
});

app.use('/', (req, res, next) => {
  console.log('I AM HERE');
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'orange') {
    return next();
  }
  throw new ExpressError('password wrong', 401);
};

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    throw new ExpressError(message, 400);
  } else {
    next();
  }
  console.log(result);
};

app.get('/', (req, res) => {
  console.log(`Main requestTime:: ${req.requestTime}`);
  res.render('home');
});

app.get(
  '/campgrounds',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
  })
);

app.post(
  '/campgrounds',
  validateCampground,
  catchAsync(async (req, res) => {
    // if (!req.body.campground)
    //   throw new ExpressError('유효하지 않은 캠프 데이터 입니다.', 404);

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground.id}`);
  })
);

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    throw new ExpressError('캡프가 존재하지 않습니다.', 404);
  }
  res.render('campgrounds/show', { campground });
});

app.get(
  '/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      throw new ExpressError('캡프가 존재하지 않습니다', 404);
    }
    res.render('campgrounds/edit', { campground });
  })
);

app.put(
  '/campgrounds/:id',
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  })
);

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  if (!err.message) err.message = 'Oh no, Something went wrong!';
  res.status(status).render('error', { err });
});

app.listen(port, () => {
  console.log('3000 Connected...');
});

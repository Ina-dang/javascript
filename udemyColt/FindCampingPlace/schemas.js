const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    location: Joi.string().required(),
    describtion: Joi.string().required(),
  }).required(),
}); //몽구스 가기전 유효성 검사

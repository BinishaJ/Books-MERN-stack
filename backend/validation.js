const Joi = require("@hapi/joi");

const booksValidation = (data) => {
  const schema = Joi.object({
    isbn: Joi.number().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = booksValidation;

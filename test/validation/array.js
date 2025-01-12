var Joi = require('@hapi/joi');


module.exports = {
  body: Joi.object({
    numbers: Joi.array().items(Joi.number().valid(1, 2, 3, 4, 5)),
    validate_numbers: Joi.array().items(Joi.number().valid(Joi.in('$numbers')))
  })
};

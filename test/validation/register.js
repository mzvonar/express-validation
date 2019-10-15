'use strict';
var Joi = require('@hapi/joi');

module.exports.post = {
  options: { flatten: true },
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(10)
  })
};
'use strict';

var Joi = require('@hapi/joi');

module.exports = {
  options: { contextRequest: true },
  body: Joi.object({
    id: Joi.string().valid(Joi.ref('$params.id')).required()
  })
};

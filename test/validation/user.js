'use strict';

var Joi = require('@hapi/joi');

module.exports.get = {
  headers: Joi.object({
    accesstoken: Joi.string().required(),
    userid : Joi.string().required()
  })
};

module.exports.put = {
  headers: Joi.object({
    accesstoken: Joi.string().required(),
    userid : Joi.string().required()
  }),
  params: Joi.object({
    id : Joi.number().integer().required()
  }),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  })
};

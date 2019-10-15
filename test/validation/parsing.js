var Joi = require('@hapi/joi');

exports.params = {
  params: Joi.object({
    id: Joi.number().integer().default(77)
  })
};

exports.query = {
  query: Joi.object({
    id: Joi.number().integer().default(77)
  })
};

exports.body = {
  body: Joi.object({
    id: Joi.number().integer().default(77)
  })
};

exports.headers = {
  headers: Joi.object({
    id: Joi.number().integer().default(77)
  })
};

exports.cookies = {
  cookies: Joi.object({
    id: Joi.number().integer().default(77)
  })
};

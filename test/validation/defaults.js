var Joi = require('@hapi/joi');

var generateUsername = function (context) {
  return context.firstname.toLowerCase() + '-' + context.lastname.toLowerCase();
};

generateUsername.description = 'generated username';
module.exports = {
  body: Joi.object({
    username: Joi.string().default(generateUsername),
    firstname: Joi.string(),
    lastname: Joi.string(),
    created: Joi.date().default(Date.now),
    status: Joi.string().default('registered'),   
    registered: Joi.boolean().default(true),
    type: Joi.string().when('registered', { is: true, then: 'registered', otherwise: 'unregistered' }),
    values: Joi.array().default(['1'])
  })
};

'use strict';
var assignIn = require('lodash/assignIn');
var find = require('lodash/find');
var defaults = require('lodash/defaults');
var ValidationError = require('./validation-error');

var defaultOptions = {
  contextRequest: false,
  allowUnknownHeaders: true,
  allowUnknownBody: true,
  allowUnknownQuery: true,
  allowUnknownParams: true,
  allowUnknownCookies: true,
  status: 400,
  statusText: 'Bad Request'
};
var globalOptions = {};

// maps the corresponding request object to an `express-validation` option
var unknownMap = {
  headers: 'allowUnknownHeaders',
  body: 'allowUnknownBody',
  query: 'allowUnknownQuery',
  params: 'allowUnknownParams',
  cookies: 'allowUnknownCookies'
};

exports = module.exports = function expressValidation (schema) {
  if (!schema) throw new Error('Please provide a validation schema');

  return function (req, res, next)  {
    var errors = [];

    // Set default options
    var options = defaults({}, schema.options || {}, globalOptions, defaultOptions);

    // NOTE: mutates `errors`
    ['headers', 'body', 'query', 'params', 'cookies'].forEach(function (key) {
      var allowUnknown = options[unknownMap[key]];
      var entireContext = options.contextRequest ? req : null;
      if (schema[key]) validate(errors, req[key], schema[key], key, allowUnknown, entireContext);
    });

    if (errors && errors.length === 0) return next();

    return next(new ValidationError(errors, options));
  };
};

exports.ValidationError = ValidationError;

exports.options = function (opts) {
  if (!opts) {
    globalOptions = {};
    return;
  }

  globalOptions = defaults({}, globalOptions, opts);
};

/**
 * validate checks the current `Request` for validations
 * NOTE: mutates `request` in case the object is valid.
 */
function validate (errObj, request, schema, location, allowUnknown, context) {
  if (!request || !schema) return;

  var joiOptions = {
    context: context || request,
    allowUnknown: allowUnknown,
    abortEarly: false
  };

  var { error, value } = schema.validate(request, joiOptions);

  if (!error || error.details.length === 0) {
    assignIn(request, value); // joi responses are parsed into JSON
    return;
  }
  error.details.forEach(function (error) {
    var errorExists = find(errObj, function (item) {
      var path = Array.isArray(error.path) ?  error.path[0] : error.path;
      if (item && item.field === path && item.location === location) {
        item.messages.push(error.message);
        item.types.push(error.type);
        return item;
      }
      return;
    });

    if (!errorExists) {
      errObj.push({
        field: Array.isArray(error.path) ?  error.path[0] : error.path,
        location: location,
        messages: [error.message],
        types: [error.type]
      });
    }

  });
}

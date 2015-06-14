'use strict';

var utils = require('./utils');

/**
 * set/get option
 * @param {string} key - name of option to set/get
 * @param {*} value - value to set
 */
var set = function set(key, value) {

  // if no arguments
  if (arguments.length < 1 || arguments.length > 2) {
    throw new Error('Invalid number of arguments.', 'ConfigError');
  }

  // if only key argument exist, the treat as a get()
  if (arguments.length === 1) {
    return this._options[key];
  }

  switch (key) {
    case 'path': {
      if (utils.typeOf(value) !== 'string') {
        throw new Error('Invalid configuration settings. "' +
          key + '" must be a string.');
      }
      break;
    }

    case 'methods': {
      if (utils.typeOf(value) === 'string') {
        value = [value];
      }
      if (!utils.isMethodArray(value)) {
        throw new Error('Invalid configuration settings. "' +
          key + '" must be a string or an array of strings.');
      }
      break;
    }

    case 'payload': {
      if (utils.typeOf(value) !== 'object' &&
          utils.typeOf(value) !== 'string') {
        throw new Error('Invalid configuration settings. "' +
          key + '" must be a string or an object.');
      }
      break;
    }

    default: {
      throw new Error('Invalid configuration settings. "' +
        key + '" is not a valid setting option.');
    }
  }

  // store value
  this._options[key] = value;

  // allow chaining
  return this;
};

// export public api function
module.exports = set;

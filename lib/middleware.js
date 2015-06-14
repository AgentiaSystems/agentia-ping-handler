'use strict';

var utils = require('./utils');

var middleware = function(options) {
  var path = utils.typeOf(this) === 'object' ? this.get('path') : options.path;
  var methods = utils.typeOf(this) === 'object' ?
    this.get('methods') : options.methods;
  var payload = utils.typeOf(this) === 'object' ?
    this.get('payload') : options.payload;

  return function (req, res, next) {
    if (req.path === path) {

      if (~methods.indexOf(req.method)) {
        // handle HEAD method
        if (req.method === 'HEAD') {
          return res.end();
        }

        // handle GET method
        if (utils.typeOf(payload) === 'object') {
          return res.json(payload);
        }
        return res.send(payload);
      }
    }

    next();

  };
};

module.exports = middleware;

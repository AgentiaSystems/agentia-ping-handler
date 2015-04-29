![agentia-ping-handler logo](media/logo.png)
---
[![Build Status](https://travis-ci.org/AgentiaSystems/agentia-ping-handler.svg?branch=master)](https://travis-ci.org/AgentiaSystems/agentia-ping-handler) [![Coverage Status](https://coveralls.io/repos/AgentiaSystems/agentia-ping-handler/badge.svg?branch=master)](https://coveralls.io/r/AgentiaSystems/agentia-ping-handler?branch=master) [![Code Climate](https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler/badges/gpa.svg)](https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler)

Express middleware to handle HTTP ping requests (GET and HEAD).

**agentia-ping-handler** intercepts `HEAD` and `GET` requests to `/ping` and immediately replies with a `200` status code, preventing other Express middlewares from loading.

This is useful to prevent `session` and other unnecessary middleware to load when your site/app pinged by an external monitoring service.

## Installation
[![NPM version](https://badge.fury.io/js/agentia-ping-handler.png)](https://www.npmjs.com/package/agentia-ping-handler)

**agentia-ping-handler** is available on [npm](http://npmjs.com/package/agentia-ping-handler).

```js
npm install --save agentia-ping-handler
```

## Usage
```js
pingHandler({options}).middleware()
```

### Express
We recommend that you configure **agentia-ping-handler** as the first Express middleware. At the very least, before any `session` middleware, to prevent sessions from being created as a result of monitoring pings.

```js
var pingHandler = require('agentia-ping-handler');

var app = express();

app.use(pingHandler.middleware());
```

### KeystoneJS
To use with [KeystoneJS](http://keystonejs.com) just use the Express instance exposed in the `.app` property.

```js
var pingHandler = require('agentia-ping-handler');

var keystone = require('keystone');

keystone.init({
	...
});

keystone.app.use(pingHandler.middleware());
```

## Configuration Options
By default, agentia-ping-handler intercepts `HEAD` and `GET` requests to `/ping`. However, agentia-ping-handler offers allows you to set customize any of these defaults. The options can be configured using any of the following methods:

* using the `.config()` method
* using the `.set()` method

## API

### Using .set()
```js
pingHandler.set('option', 'value');
```

Allows you to configure individual options settings. Available configuration options include:

Option | Type | Description | Default Value
--- | --- | --- | ---
methods | String<br>Array | HTTP methods to be processed (currently only `GET` and `HEAD` are supported) | `['GET', 'HEAD']`
path | String | path/route to be processed | `'/ping'`
payload | String<br>Object | data sent in response to GET requests | `'OK'`

### .config()
Allows you to set multiple configuration options in a single call. Set `.set()` above for a list of the available configuration options.

```js
pingHandler.config({
  'option1': 'value1'
  'option2': 'value2'
});
```

### .middleware()
Returns the middleware to be passed to Express using `.use()`.

```js
app.use(pingHandler.middleware());
```

## License
Agentia Ping Handler is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles), [http://www.agentia.asia](http://www.agentia.asia)


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

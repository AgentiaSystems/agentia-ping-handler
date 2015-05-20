![agentia-ping-handler logo][logo-url]
---
[![Build Status][travis-badge]][travis-url]
[![Test Coverage][coverage-badge]][coverage-url]
[![Code Climate][climate-badge]][climate-url]

Express middleware to handle HTTP ping requests (GET and HEAD).

**agentia-ping-handler** intercepts `HEAD` and `GET` requests to `/ping` and immediately replies with a `200` status code, preventing other Express middlewares from loading.

This is useful to prevent `session` and other unnecessary middleware to load when your site/app pinged by an external monitoring service.

## Installation
[![NPM version][npm-badge]][npm-url]

**agentia-ping-handler** is available on [npm][npm-url]

```js
npm install --save agentia-ping-handler
```

## Usage
```js
app.use(pingHandler({options}))
```

### Express
We recommend that you configure **agentia-ping-handler** as the first Express middleware. At the very least, before any `session` middleware, to prevent sessions from being created as a result of monitoring pings.

```js
var pingHandler = require('agentia-ping-handler');

var app = express();

app.use(pingHandler());
```

### KeystoneJS
To use with [KeystoneJS][keystone-url] just use the Express instance exposed in the `.app` property.

```js
var pingHandler = require('agentia-ping-handler');

var keystone = require('keystone');

keystone.init({
	...
});

keystone.app.use(pingHandler());
```

## Configuration Options
By default, agentia-ping-handler intercepts `HEAD` and `GET` requests to `/ping`. However, agentia-ping-handler offers allows you to set customize any of these defaults. The options can be configured by passing confuration obbject to the `pingHandler()` middleware function.


```js
app.use(pingHandler({
  methods: 'GET'
  path: '/ping',
  payload: 'OK'
}));
```

Available configuration options include:

Option | Type | Description | Default Value
------ | ---- | ----------- | -------------
methods | String<br>Array | HTTP methods to be processed (currently only `GET` and `HEAD` are supported) | `['GET', 'HEAD']`
path | String | path/route to be processed | `'/ping'`
payload | String<br>Object | data sent in response to GET requests | `'OK'`


## Deprecated methods
The following methods are deprecated and will be removed in future versions of **agentia-ping-handler**.

Method | Deprecation Version | Removal Version
------ | :-------------------: | :------------------------:
`.set()` | `1.1.0` | `2.0.0`
`.config()` | `1.1.0` | `2.0.0`
`.middleware()` | `1.1.0` | `2.0.0`

## License
Agentia Ping Handler is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles][jme-url], [http://www.agentia.asia][agentia-url]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[logo-url]: media/logo.png
[npm-badge]: https://badge.fury.io/js/agentia-ping-handler.png
[npm-url]: https://www.npmjs.com/package/agentia-ping-handler

[travis-badge]: https://travis-ci.org/AgentiaSystems/agentia-ping-handler.svg?branch=master
[travis-url]: https://travis-ci.org/AgentiaSystems/agentia-ping-handler

[coverage-badge]: https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler/badges/coverage.svg
[coverage-url]: https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler/coverage

[climate-badge]: https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/AgentiaSystems/agentia-ping-handler

[jme-url]: https://github.com/JohnnyEstilles
[agentia-url]: http://www.agentia.asia
[keystone-url]: http://keystonejs.com

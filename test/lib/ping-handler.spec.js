'use strict';

var chai = require('chai');
var expect = chai.expect;
var PingHandler = require('../../lib/ping-handler');

describe('pingHandler()', function () {

	it('should set defaults when called without args', function() {
		var pingHandler = new PingHandler();

		expect(pingHandler.get('path')).to.equal('/ping');
		expect(pingHandler.get('methods')).to.deep.equal(['GET', 'HEAD']);
		expect(pingHandler.get('payload')).to.equal('OK');
	});

	it('should set options when called with object', function() {
		var pingHandler = new PingHandler({
			'path': '/valid/path',
			'methods': 'HEAD',
			'payload': 'GOOD'
		});

		expect(pingHandler.get('path')).to.equal('/valid/path');
		expect(pingHandler.get('methods')).to.deep.equal(['HEAD']);
		expect(pingHandler.get('payload')).to.equal('GOOD');
	});

});
'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var httpMocks = require('node-mocks-http');
var PingHandler = require('../../');

chai.use(sinonChai);

describe('.middleware()', function () {
	before(function() {
		this.handler = new PingHandler();
		this.middleware = this.handler.middleware();
		this.next = sinon.stub();
	});

	beforeEach(function() {
		this.res = httpMocks.createResponse();
	});

	afterEach(function() {
		this.res = null;
		this.next.reset();
	});

	describe('with default settings', function() {

		it('should return 200/OK when GET /ping', function() {
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/ping'
			});

			this.middleware(req, this.res, this.next);
			expect(this.res._getStatusCode()).to.equal(200);
			expect(this.res._getData()).to.equal('OK');
			expect(this.res._isEndCalled()).to.be.false;
			expect(this.next).not.to.have.been.called;
		});

		it('should return 200/OK when HEAD /ping', function() {
			var req = httpMocks.createRequest({
				method: 'HEAD',
				url: '/ping'
			});

			this.middleware(req, this.res, this.next);
			expect(this.res._getStatusCode()).to.equal(200);
			expect(this.res._getData()).to.equal('');
			expect(this.res._isEndCalled()).to.be.true;
			expect(this.next).not.to.have.been.called;
		});

		it('should call next() when POST /ping', function() {
			var req = httpMocks.createRequest({
				method: 'POST',
				url: '/ping'
			});

			this.middleware(req, this.res, this.next);
			expect(this.next).to.be.called.once;
			expect(this.res._isEndCalled()).to.be.false;
		});

		it('should call next() when GET /invalid', function() {
			var req = httpMocks.createRequest({
				method: 'GET',
				url: '/invalid'
			});

			this.middleware(req, this.res, this.next);
			expect(this.next).to.be.called.once;
			expect(this.res._isEndCalled()).to.be.false;
		});

		it('should call next() when HEAD /invalid', function() {
			var req = httpMocks.createRequest({
				method: 'HEAD',
				url: '/invalid'
			});

			this.middleware(req, this.res, this.next);
			expect(this.next).to.be.called.once;
			expect(this.res._isEndCalled()).to.be.false;
		});

	});

	describe('with custom settings', function() {

		it('should return 200/custom JSON payload', function() {
			var payload = { 'key': 'value' };
			var path = '/this/is/a/test';
			var data;
			var req = httpMocks.createRequest({
				method: 'GET',
				url: path
			});

			this.handler.config({
				path: path,
				payload: payload
			});
			this.middleware = this.handler.middleware();
			this.middleware(req, this.res, this.next);
			data = JSON.parse(this.res._getData());

			expect(data.key).to.equal(payload.key);
			expect(this.res._getStatusCode()).to.equal(200);
			expect(this.res._isJSON()).to.be.true;
			expect(this.res._isEndCalled()).to.be.false;
			expect(this.next).not.to.have.been.called;

		});

	});
});

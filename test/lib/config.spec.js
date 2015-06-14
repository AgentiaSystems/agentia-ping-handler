'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var PingHandler = require('../../');

chai.use(sinonChai);

describe('.config()', function () {

  before(function () {
    this.handler = new PingHandler();
    sinon.stub(this.handler, 'set');
  });

  after(function() {
    this.handler.set.restore();
  });

  describe('with invalid arguments', function () {

    afterEach(function() {
      this.handler.set.reset();
    });

    it('should error when called with no arguments', function() {
      var fn = function() {
        this.handler.config();
      }.bind(this);
      expect(fn).to.throw('Invalid configuration settings. Must be an object.');
    });

    it('should error when called with a non-object', function() {
      var fn = function() {
        this.handler.config('invalid');
      }.bind(this);
      expect(fn).to.throw('Invalid configuration settings. Must be an object.');
    });

    it('should error when called with an invalid option', function() {
      var fn = function() {
        this.handler.config({
          'invalid': 'value'
        });
      }.bind(this);
      expect(fn).to.throw('Invalid configuration settings. ' +
          '"invalid" is not a valid setting.');
    });

  });

  describe('with valid arguments', function () {

    it('should call .set() for every option passed', function () {
      var options = {
        'path': '/valid/path'
      };

      this.handler.config(options);
      expect(this.handler.set).to.be.called.once;
      expect(this.handler.set).to.have.been
        .calledWithExactly('path', '/valid/path');
      this.handler.set.reset();

      options = {
        'path': '/valid/path',
        'methods': ['GET', 'HEAD'],
        'payload': 'GOOD'
      };

      this.handler.config(options);
      expect(this.handler.set).to.be.called.thrice;
      expect(this.handler.set.firstCall).to.have.been
        .calledWithExactly('path', '/valid/path');
      expect(this.handler.set.secondCall).to.have.been
        .calledWithExactly('methods', ['GET', 'HEAD']);
      expect(this.handler.set.thirdCall).to.have.been
        .calledWithExactly('payload', 'GOOD');
    });

  });

});

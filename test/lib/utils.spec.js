'use strict';

var chai = require('chai');
var expect = chai.expect;
var utils = require('../../lib/utils');

describe('utils', function() {

  describe('isMethodArray()', function () {

    it('should return FALSE if not a valid array of methods', function() {
      expect(utils.isMethodArray('INVALID')).to.equal(false);
      expect(utils.isMethodArray(999)).to.equal(false);
      expect(utils.isMethodArray(true)).to.equal(false);
      expect(utils.isMethodArray([])).to.equal(false);
      expect(utils.isMethodArray(['INVALID'])).to.equal(false);
    });

    it('should return TRUE if valid array of methods', function() {
      expect(utils.isMethodArray(['HEAD'])).to.equal(true);
      expect(utils.isMethodArray(['GET'])).to.equal(true);
      expect(utils.isMethodArray(['HEAD', 'GET'])).to.equal(true);
    });

  });

  describe('typeOf()', function() {

    it('should detect objects', function() {
      expect(utils.typeOf({})).to.equal('object');
    });

    it('should detect strings', function() {
      expect(utils.typeOf('')).to.equal('string');
    });

    it('should detect numbers', function() {
      expect(utils.typeOf(0)).to.equal('number');
    });

    it('should detect array', function() {
      expect(utils.typeOf([])).to.equal('array');
    });

    it('should detect boolean', function() {
      expect(utils.typeOf(true)).to.equal('boolean');
    });

  });

});

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Propertyprolite tests', function () {
  describe('Display welcome message', function () {
    it('should display welcome message on start', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1').end(function (err, res) {
        expect(res.body.message).to.equal('Welcome to Propertypro--Lite API');
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should throw an error for an invalid url', function (done) {
      _chai["default"].request(_app["default"]).get('/anyotherthing').end(function (err, res) {
        expect(res.body.message).to.equal('Page Not Found');
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
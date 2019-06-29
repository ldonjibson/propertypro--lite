"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var signupUrl = '/api/v1/auth/signup';
describe('POST/auth signup', function () {
  it('should signup a non existing user(client)', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'oslo',
      lastName: 'oslo',
      email: 'oslo@gmail.com',
      password: 'moneyheist',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res).to.have.status(201);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.be.a('object');
      expect(res.body.data).to.have.property('token');
      expect(res.body.data).to.have.property('id');
      expect(res.body.data).to.have.property('firstName');
      expect(res.body.data).to.have.property('lastName');
      expect(res.body.data).to.have.property('email');
      expect(res.body.data.token).to.be.a('string');
      expect(res.body.data.email).to.equal('oslo@gmail.com');
      done();
    });
  });
  it('should not signup a registered user', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'Nairobi',
      lastName: 'Ozil',
      email: 'nairobi@gmail.com',
      password: 'moneyheist',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Email already in use');
      done();
    });
  });
  it('should not signup a user when the email is missing', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'professor',
      lastName: 'sergio',
      password: 'maquiness',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Enter a valid email.');
      done();
    });
  });
  it('should not signup a user when firstName is missing', function (done) {
    var user = {
      firstName: '',
      lastName: 'sergio',
      email: 'professor@gmail.com',
      password: 'professor',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    };

    _chai["default"].request(_app["default"]).post(signupUrl).send(user).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Enter a valid firstName.');
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('should not signup a user when lastName is missing', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'sergio',
      email: 'professor@gmail.com',
      password: 'professor',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.statusCode).to.equal(400);
      expect(res.body.status).to.equal('error');
      expect(res.body.error).to.equal('Enter a valid lastName.');
      done();
    });
  });
  it('should not signup a user when the password is missing', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'sergio',
      lastName: 'xavi',
      email: 'xavi@gmail.com',
      phoneNumber: '2348181384092',
      accountType: 'agent'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal('Enter a password with at least 8 characters.');
      done();
    });
  });
  it('should not signup a user when the phoneNumber is missing', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'sergio',
      lastName: 'xavi',
      email: 'xavi@gmail.com',
      password: 'nollywo',
      accountType: 'user'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal('Enter a valid Phone Number');
      done();
    });
  });
  it('should not signup a user when the accountType is missing', function (done) {
    _chai["default"].request(_app["default"]).post(signupUrl).send({
      firstName: 'sergio',
      lastName: 'xavi',
      email: 'xavi@gmail.com',
      password: 'nollywo',
      phoneNumber: '2348181384092'
    }).end(function (err, res) {
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal('error');
      expect(res.statusCode).to.equal(400);
      expect(res.body.error).to.equal('account type can only be agent and client');
      done();
    });
  });
}); // Signin Test

describe('POST/auth signin', function () {
  var signinUrl = '/api/v1/auth/signin';
  it('should signin an existing user(Agent)', function (done) {
    _chai["default"].request(_app["default"]).post(signinUrl).send({
      email: 'ajibolahussain@gmail.com',
      password: 'nollywood10'
    }).end(function (err, res) {
      expect(res.body.status).to.equal('success');
      expect(res.statusCode).to.equal(200);
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('token');
      done();
    });
  });
  it('should signin an existing user(client)', function (done) {
    _chai["default"].request(_app["default"]).post(signinUrl).send({
      email: 'johndum@gmail.com',
      password: 'nollywood10'
    }).end(function (err, res) {
      expect(res.body.status).to.equal('success');
      expect(res.statusCode).to.equal(200);
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('token');
      done();
    });
  });
  it('should not signin an unregistered user', function (done) {
    _chai["default"].request(_app["default"]).post(signinUrl).send({
      email: 'lolzing@gmail.com',
      password: 'lolzing'
    }).end(function (err, res) {
      expect(res.body.status).to.equal('error');
      expect(res.statusCode).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('User doesn\'t exist');
      done();
    });
  });
  it('should not signin an invalid password', function (done) {
    _chai["default"].request(_app["default"]).post(signinUrl).send({
      email: 'Berliniike@gmail.com',
      password: 'sfssffdfs'
    }).end(function (err, res) {
      expect(res.body.status).to.equal('error'); // expect(res.statusCode).to.equal(400);

      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Incorrect Password or Email');
      done();
    });
  });
});
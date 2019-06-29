"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('POST, PATCH, DELETE, GET /property/', function () {
  var user = {
    email: 'nairobi@gmail.com',
    password: 'nollywood10'
  };
  var user2 = {
    email: 'MarkRio@gmail.com',
    password: 'nollywood10'
  };
  var userToken;
  before(function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user).end(function (err, res) {
      userToken = res.body.data.token;
      done();
    });
  });
  var userToken2;
  before(function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(user2).end(function (err, res) {
      userToken2 = res.body.data.token;
      done();
    });
  });
  describe('POST /api/v1/property', function () {
    it('should successfully create a property', function (done) {
      // try {/
      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.statusCode).to.equal(201);
      });

      done();
    }).timeout(10000);
    it('should not post property if type is missing', function (done) {
      var create = {
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the property type');
        done();
      });
    });
    it('should not post property if state is missing', function (done) {
      var create = {
        type: 'mini flat',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the state where the property is located');
        done();
      });
    });
    it('should not post property if city is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the city where the property is located');
        done();
      });
    });
    it('should not post property if address is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the address of the property');
        done();
      });
    });
    it('should not post property if amount is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter an amount');
        done();
      });
    });
    it('should not post property for an invalid token', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', 'invalidtoken12343').field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You are not signed in.');
        done();
      });
    });
    it('should not post property if user is not an agent', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/property').set('authorization', userToken2).field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
  });
  describe('PATCH /api/v1/property/<:property-id>', function () {
    it('should successfully update a specific property', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.statusCode).to.equal(201);
      });

      done();
    }).timeout(10000);
    it('should not update property if type is missing', function (done) {
      var create = {
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the property type');
        done();
      });
    });
    it('should not update property if state is missing', function (done) {
      var create = {
        type: 'mini flat',
        city: 'lagos',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the state where the property is located');
        done();
      });
    });
    it('should not update property if city is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        address: '2,owodunit street',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the city where the property is located');
        done();
      });
    });
    it('should not update property if address is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        amount: 60000.00
      };

      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter the address of the property');
        done();
      });
    });
    it('should not update property if amount is missing', function (done) {
      var create = {
        type: 'mini flat',
        state: 'lagos state',
        city: 'lagos',
        address: '2,owodunit street'
      };

      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken).send(create).end(function (err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Enter an amount');
        done();
      });
    });
    it('should not update property for an invalid token', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', 'invalidtoken12343').field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You are not signed in.');
        done();
      });
    });
    it('should not update property if user is not an agent', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3').set('authorization', userToken2).field('type', 'mini flat').field('state', 'lagos state').field('city', 'lagos').field('address', '2,owodunit street').field('amount', 400000).attach('image', 'server/spec/realestate.jpg', 'realestate.jpg').end(function (err, res) {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
  });
  describe('PATCH /api/v1/property/:propertyId/sold', function () {
    it('should update status of a property', function (done) {
      // try {/
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3/sold').set('authorization', userToken).end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.status).to.equal('sold');
        expect(res.statusCode).to.equal(201);
      });

      done();
    });
    it('should not update status if token is invalid ', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3/sold').set('authorization', 'invalidtoken12343').end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You are not signed in.');
        done();
      });
    });
    it('should not update status if user is not an agent ', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/3/sold').set('authorization', userToken2).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
    it('should not update status if paramater is invalid ', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/property/g/sold').set('authorization', userToken2).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid id, id must be a number');
        done();
      });
    });
  });
  describe('DELETE /api/v1/property/:propertyId', function () {
    it('should delete a property', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/3').set('authorization', userToken).end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('Property deleted successfully.');
        expect(res.statusCode).to.equal(200);
      });

      done();
    });
    it('should not delete a property if token is invalid ', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/3').set('authorization', 'invalidtoken12343').end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You are not signed in.');
        done();
      });
    });
    it('should not delete a property if user is not an agent ', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/3').set('authorization', userToken2).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Unauthorized');
        done();
      });
    });
    it('should not delete a property if paramater is invalid ', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/api/v1/property/g').set('authorization', userToken2).end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Invalid id, id must be a number');
        done();
      });
    });
  });
  describe('GET /api/v1/property', function () {
    it('should list all properties and types', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property').end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.statusCode).to.equal(200);
      });

      done();
    });
  });
  describe('GET /api/v1/property/:propertyId', function () {
    it('should get details of a specific property', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/4').end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.statusCode).to.equal(200);
      });

      done();
    });
    it('should not get details of a specific property for invalid id', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/g').end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(400);
      });

      done();
    });
  });
  describe('GET /api/v1/property/?type=PropertyType', function () {
    it('should get specific type of properties', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/?type=2 bed room').end(function (err, res) {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        expect(res.statusCode).to.equal(200);
      });

      done();
    });
    it('should not get specific type of properties for iinvalid property type', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/property/?type=gjhssfasa').end(function (err, res) {
        expect(res.body.status).to.equal('error');
        expect(res.statusCode).to.equal(404);
      });

      done();
    });
  });
});
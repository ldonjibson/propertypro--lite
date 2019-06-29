"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../helper/response/index"));

var _property = _interopRequireDefault(require("../model/property"));

var _users = _interopRequireDefault(require("../model/users"));

/* eslint-disable no-param-reassign */

/* eslint-disable radix */

/* eslint-disable object-curly-newline */

/* eslint-disable max-len */

/**
    * @class PropertyController
    * @description Allow a user to post a property
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    */
// class PropertyController {
var PropertyController =
/*#__PURE__*/
function () {
  function PropertyController() {
    (0, _classCallCheck2["default"])(this, PropertyController);
  }

  (0, _createClass2["default"])(PropertyController, null, [{
    key: "postProperty",

    /**
      * @static postProperty
      * @description Allow a user to create bank account
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */
    value: function () {
      var _postProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, type, state, city, address, amount, imageUrl, userid, price, _ref, id, created_on, status, owner, image_url, newProperty;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, type = _req$body.type, state = _req$body.state, city = _req$body.city, address = _req$body.address, amount = _req$body.amount, imageUrl = _req$body.imageUrl, userid = req.userDetails.id;
                _context.next = 3;
                return parseFloat(amount).toFixed(2);

              case 3:
                price = _context.sent;
                _context.prev = 4;
                _ref = [_property["default"].length + 1, Date.now(), 'available', userid, imageUrl], id = _ref[0], created_on = _ref[1], status = _ref[2], owner = _ref[3], image_url = _ref[4];
                newProperty = {
                  id: id,
                  owner: owner,
                  status: status,
                  type: type,
                  state: state,
                  city: city,
                  address: address,
                  price: price,
                  created_on: created_on,
                  image_url: image_url
                };
                newProperty.address = address.trim();

                _property["default"].push(newProperty);

                return _context.abrupt("return", _index["default"].successResponse(res, 201, 'success', newProperty));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 12]]);
      }));

      function postProperty(_x, _x2) {
        return _postProperty.apply(this, arguments);
      }

      return postProperty;
    }()
    /**
      * @static updateProperty
      * @description Allow a user to Update Property
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */

  }, {
    key: "updateProperty",
    value: function () {
      var _updateProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, type, state, city, address, price, imageUrl, userid, propertyId, getProperty, _ref2, id, status, owner;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, type = _req$body2.type, state = _req$body2.state, city = _req$body2.city, address = _req$body2.address, price = _req$body2.price, imageUrl = _req$body2.imageUrl, userid = req.userDetails.id, propertyId = req.params.propertyId;
                _context2.prev = 1;
                _context2.next = 4;
                return _property["default"].find(function (property) {
                  return property.id === parseInt(propertyId) && property.owner === parseInt(userid);
                });

              case 4:
                getProperty = _context2.sent;

                if (getProperty) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", _index["default"].errorResponse(res, 401, 'error', 'You are not authorized to edit this property'));

              case 7:
                getProperty.address = address.trim();
                _ref2 = [propertyId, getProperty.status, userid], id = _ref2[0], status = _ref2[1], owner = _ref2[2];
                getProperty = {
                  id: id,
                  owner: owner,
                  status: status,
                  type: type,
                  city: city,
                  state: state,
                  address: address,
                  price: price,
                  imageUrl: imageUrl
                };
                return _context2.abrupt("return", _index["default"].successResponse(res, 201, 'success', getProperty));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 13]]);
      }));

      function updateProperty(_x3, _x4) {
        return _updateProperty.apply(this, arguments);
      }

      return updateProperty;
    }()
    /**
      * @static updateStatusProperty
      * @description Allow a user to Update StatusProperty
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */

  }, {
    key: "updateStatusProperty",
    value: function () {
      var _updateStatusProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var userid, propertyId, getProperty;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userid = req.userDetails.id, propertyId = req.params.propertyId;
                _context3.prev = 1;
                _context3.next = 4;
                return _property["default"].find(function (property) {
                  return property.id === parseInt(propertyId) && property.owner === parseInt(userid);
                });

              case 4:
                getProperty = _context3.sent;

                if (getProperty) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", _index["default"].errorResponse(res, 401, 'error', 'You are not authorized to edit this property'));

              case 7:
                getProperty.status = 'sold';
                return _context3.abrupt("return", _index["default"].successResponse(res, 201, 'success', getProperty));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 11]]);
      }));

      function updateStatusProperty(_x5, _x6) {
        return _updateStatusProperty.apply(this, arguments);
      }

      return updateStatusProperty;
    }()
    /**
      * @static deleteProperty
      * @description Allow a agent to delete Property
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */

  }, {
    key: "deleteProperty",
    value: function () {
      var _deleteProperty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var userid, propertyId, getProperty;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userid = req.userDetails.id, propertyId = req.params.propertyId;
                _context4.prev = 1;
                _context4.next = 4;
                return _property["default"].find(function (property) {
                  return property.id === parseInt(propertyId) && property.owner === parseInt(userid);
                });

              case 4:
                getProperty = _context4.sent;

                if (getProperty) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", _index["default"].errorResponse(res, 401, 'error', 'You are not authorized to delete this property'));

              case 7:
                _property["default"].splice([parseInt(propertyId) - 1], 1);

                return _context4.abrupt("return", _index["default"].successResponse(res, 200, 'success', {
                  message: 'Property deleted successfully.'
                }));

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 11]]);
      }));

      function deleteProperty(_x7, _x8) {
        return _deleteProperty.apply(this, arguments);
      }

      return deleteProperty;
    }()
    /**
      * @static listProperties
      * @description Allow a user to view all Properties and specific type properties
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */

  }, {
    key: "listProperties",
    value: function () {
      var _listProperties = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var type, getTypeProperties, listTypeProperties, allProperties;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                type = req.query.type;
                _context5.prev = 1;

                if (!type) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 5;
                return _property["default"].filter(function (property) {
                  return property.type === type;
                });

              case 5:
                getTypeProperties = _context5.sent;
                _context5.next = 8;
                return getTypeProperties.map(function (property) {
                  var getPropertyOwner = _users["default"].find(function (user) {
                    return user.id === property.owner;
                  });

                  var _ref3 = [getPropertyOwner.email, getPropertyOwner.phoneNumber];
                  property.ownerEmail = _ref3[0];
                  property.ownerPhoneNumber = _ref3[1];
                  return property;
                });

              case 8:
                listTypeProperties = _context5.sent;

                if (!(listTypeProperties.length === 0)) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", _index["default"].errorResponse(res, 404, 'error', 'No property was found'));

              case 11:
                return _context5.abrupt("return", _index["default"].successResponse(res, 200, 'success', listTypeProperties));

              case 12:
                _context5.next = 14;
                return _property["default"].map(function (property) {
                  var getPropertyOwner = _users["default"].find(function (user) {
                    return user.id === property.owner;
                  });

                  var _ref4 = [getPropertyOwner.email, getPropertyOwner.phoneNumber];
                  property.ownerEmail = _ref4[0];
                  property.ownerPhoneNumber = _ref4[1];
                  return property;
                });

              case 14:
                allProperties = _context5.sent;
                return _context5.abrupt("return", _index["default"].successResponse(res, 200, 'success', allProperties));

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 18]]);
      }));

      function listProperties(_x9, _x10) {
        return _listProperties.apply(this, arguments);
      }

      return listProperties;
    }()
    /**
      * @static specificPropertyDetail
      * @description Allow a user to view details of a specific Properties
      * @param {object} req - Request object
      * @param {object} res - Response object
      * @returns {object} Json
      * @memberof PropertyController
      */

  }, {
    key: "specificPropertyDetail",
    value: function () {
      var _specificPropertyDetail = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var propertyId, detailProperty, getPropertyOwner, _ref5;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                propertyId = req.params.propertyId;
                _context6.prev = 1;
                _context6.next = 4;
                return _property["default"].find(function (property) {
                  return property.id === parseInt(propertyId);
                });

              case 4:
                detailProperty = _context6.sent;
                _context6.next = 7;
                return _users["default"].find(function (user) {
                  return user.id === detailProperty.owner;
                });

              case 7:
                getPropertyOwner = _context6.sent;
                _ref5 = [getPropertyOwner.email, getPropertyOwner.phoneNumber];
                detailProperty.ownerEmail = _ref5[0];
                detailProperty.ownerPhoneNumber = _ref5[1];
                return _context6.abrupt("return", _index["default"].successResponse(res, 200, 'success', detailProperty));

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 14]]);
      }));

      function specificPropertyDetail(_x11, _x12) {
        return _specificPropertyDetail.apply(this, arguments);
      }

      return specificPropertyDetail;
    }()
  }]);
  return PropertyController;
}();

var _default = PropertyController;
exports["default"] = _default;
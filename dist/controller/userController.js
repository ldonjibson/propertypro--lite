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

var _passwordManager = _interopRequireDefault(require("../helper/passwordManager"));

var _users = _interopRequireDefault(require("../model/users"));

/* eslint-disable prefer-const */
// eslint-disable-next-line dot-notation

/**
   * @class UserController
   * @description UserController
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   */
var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "register",

    /**
     * @static register
     * @description Allow a user to signup
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Json
     * @memberof UserControllers
     */
    value: function () {
      var _register = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, firstName, lastName, email, password, phoneNumber, accountType, address, newUser, hashPassword, userDetails, id, isAdmin, createdOn, token, _ref;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, phoneNumber = _req$body.phoneNumber, accountType = _req$body.accountType, address = _req$body.address;
                _context.prev = 1;
                _context.next = 4;
                return _passwordManager["default"].hashPassword(password);

              case 4:
                hashPassword = _context.sent;
                _context.next = 7;
                return _users["default"].find(function (user) {
                  return user.email === email;
                });

              case 7:
                userDetails = _context.sent;

                if (!userDetails) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", _index["default"].errorResponse(res, 409, 'error', 'Email already in use'));

              case 10:
                _ref = ["45erkjherht4549".concat(Math.floor(Math.random() * 10000)), _users["default"].length + 1, false, Date.now(), hashPassword];
                token = _ref[0];
                id = _ref[1];
                isAdmin = _ref[2];
                createdOn = _ref[3];
                password = _ref[4];
                newUser = {
                  token: token,
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  phoneNumber: phoneNumber,
                  address: address,
                  accountType: accountType,
                  isAdmin: isAdmin,
                  createdOn: createdOn
                };

                _users["default"].push(newUser);

                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 23:
                return _context.abrupt("return", _index["default"].successResponse(res, 201, 'success', newUser));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 20]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
    /**
     * @static signin
     * @description Allows a user to sign in
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Json
     * @memberof UserControllers
     */

  }, {
    key: "signin",
    value: function () {
      var _signin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, userDetails, isPasswordValid;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _context2.next = 4;
                return _users["default"].find(function (user) {
                  return user.email === email;
                });

              case 4:
                userDetails = _context2.sent;

                if (userDetails) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", _index["default"].errorResponse(res, 404, 'error', 'User doesn\'t exist'));

              case 7:
                isPasswordValid = _passwordManager["default"].verifyPassword(password, userDetails.password);

                if (!(isPasswordValid === false)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", _index["default"].errorResponse(res, 400, 'error', 'Incorrect Password or Email'));

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 15:
                delete userDetails.password;
                return _context2.abrupt("return", _index["default"].successResponse(res, 200, 'success', userDetails));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function signin(_x3, _x4) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
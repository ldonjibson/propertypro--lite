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

var _index = _interopRequireDefault(require("../../helper/response/index"));

var _users = _interopRequireDefault(require("../../model/users"));

/* eslint-disable prefer-destructuring */

/**
 * @class AuthMiddleware
 * @description class contains function for implementing Authentication middleware
 */
var AuthMiddleware =
/*#__PURE__*/
function () {
  function AuthMiddleware() {
    (0, _classCallCheck2["default"])(this, AuthMiddleware);
  }

  (0, _createClass2["default"])(AuthMiddleware, null, [{
    key: "checkIfUserIsAuthenticated",

    /**
       * @static checkIfUserIsAuthenticated
       * @description a middleware function checking if a user is authenticated
       * @param {object} req HTTP request object
       * @param {object} res HTTP response object
       * @param {function} next next middleware function
       * @returns {object} returns error message if user is not authenticated
       */
    // eslint-disable-next-line consistent-return
    value: function () {
      var _checkIfUserIsAuthenticated = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var _ref, authorization, token, decoded;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _ref = req.headers || req.params || req.body, authorization = _ref.authorization;

                if (authorization) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _index["default"].errorResponse(res, 401, 'error', 'You are not signed in.'));

              case 4:
                token = authorization;
                _context.next = 7;
                return _users["default"].find(function (user) {
                  return user.token === token;
                });

              case 7:
                decoded = _context.sent;

                if (decoded) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", _index["default"].errorResponse(res, 401, 'error', 'You are not signed in.'));

              case 10:
                req.userDetails = decoded;
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 16:
                return _context.abrupt("return", next());

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function checkIfUserIsAuthenticated(_x, _x2, _x3) {
        return _checkIfUserIsAuthenticated.apply(this, arguments);
      }

      return checkIfUserIsAuthenticated;
    }()
  }, {
    key: "checkUserById",
    value: function () {
      var _checkUserById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var userDetails;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _users["default"].find(function (user) {
                  return user.id === req.userDetails.id;
                });

              case 3:
                userDetails = _context2.sent;

                if (userDetails) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", _index["default"].errorResponse(res, 404, 'error', 'User account not found'));

              case 6:
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 11:
                return _context2.abrupt("return", next());

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function checkUserById(_x4, _x5, _x6) {
        return _checkUserById.apply(this, arguments);
      }

      return checkUserById;
    }()
  }]);
  return AuthMiddleware;
}();

var _default = AuthMiddleware;
exports["default"] = _default;
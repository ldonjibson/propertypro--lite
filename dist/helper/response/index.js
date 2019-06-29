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

/**
 *
 * @description Method to send response in a generic format.
 * @param {*} res Express Response object
 * @param {number} status '200' || '400'
 * @param {string} message Message to user
 * @param {object} error (optional) Error object
 * @param {object} payload (optional) Payload data to return with the response
 * @returns {object} Json response
 */
var response =
/*#__PURE__*/
function () {
  function response() {
    (0, _classCallCheck2["default"])(this, response);
  }

  (0, _createClass2["default"])(response, null, [{
    key: "successResponse",

    /**
      * @static successResponse
      * @description returns success responses
      * @param {object} res - Response object
      * @param {number} code response code
      * @param {object} payload response code
      * @returns {object} Json
      * @memberof response
      */
    value: function () {
      var _successResponse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(res, code, message, payload) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                res.status(code).json({
                  status: message,
                  data: payload
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function successResponse(_x, _x2, _x3, _x4) {
        return _successResponse.apply(this, arguments);
      }

      return successResponse;
    }()
    /**
      * @static errorResponse
      * @description returns error responses
      * @param {object} res - Response object
      * @param {number} code response code
      * @param {object} payload response code
      * @returns {object} Json
      * @memberof response
      */

  }, {
    key: "errorResponse",
    value: function () {
      var _errorResponse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(res, code, message, payload) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                res.status(code).json({
                  status: message,
                  error: payload
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function errorResponse(_x5, _x6, _x7, _x8) {
        return _errorResponse.apply(this, arguments);
      }

      return errorResponse;
    }()
  }]);
  return response;
}();

var _default = response;
exports["default"] = _default;
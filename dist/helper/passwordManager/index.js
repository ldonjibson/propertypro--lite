"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

/**
 * @class PasswordManager
 */
var PasswordManager =
/*#__PURE__*/
function () {
  function PasswordManager() {
    (0, _classCallCheck2["default"])(this, PasswordManager);
  }

  (0, _createClass2["default"])(PasswordManager, null, [{
    key: "hashPassword",

    /**
       * @description Helper method to hash passwords
       * @static
       * @param {string} password
       * @returns {string} A string representing the hashed password
       * @memberof PasswordManager
       */
    value: function hashPassword(password) {
      return _bcryptjs["default"].hash(password, 8);
    }
    /**
       * @description Helper method to decrypt hashed passwords
       * @param {string} password
       * @param {string} hashedPassword
       * @returns {string} The original password
       * @memberof PasswordManager
       */

  }, {
    key: "verifyPassword",
    value: function verifyPassword(password, hashedPassword) {
      return _bcryptjs["default"].compareSync(password, hashedPassword);
    }
  }]);
  return PasswordManager;
}();

var _default = PasswordManager;
exports["default"] = _default;
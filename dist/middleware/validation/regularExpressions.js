"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RegularExpression =
/*#__PURE__*/
function () {
  function RegularExpression() {
    (0, _classCallCheck2["default"])(this, RegularExpression);
  }

  (0, _createClass2["default"])(RegularExpression, null, [{
    key: "validate",

    /**
    * @class
    * @RegularExpression This class contains regular expression for the app.
    */
    value: function validate() {
      return {
        // eslint-disable-next-line no-useless-escape
        email: /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
        phoneNumber: /^[0-9]*$/,
        userName: /^[a-zA-Z]{3,25}$/,
        password: /[a-zA-Z0-9]{8,}/,
        accountType: /(client|agent)$/i,
        status: /(available|sold)$/i,
        isAdmin: /(true|false)$/i,
        price: /^[0-9]+.([0-9])+$/,
        address: /^[a-zA-Z0-9_][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$/
      };
    }
  }]);
  return RegularExpression;
}();

var _default = RegularExpression;
exports["default"] = _default;
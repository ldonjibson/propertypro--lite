"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../../helper/response/index"));

var _regularExpressions = _interopRequireDefault(require("./regularExpressions"));

/* eslint-disable prefer-destructuring */

/* eslint-disable no-unused-vars */

/* eslint-disable max-len */

/* eslint-disable no-unused-expressions */

/**
     * @class AccountValidation
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     */
var AccountValidation =
/*#__PURE__*/
function () {
  function AccountValidation() {
    (0, _classCallCheck2["default"])(this, AccountValidation);
  }

  (0, _createClass2["default"])(AccountValidation, null, [{
    key: "agentChecker",

    /**
       * @static  checkIfAccountExist
       * @description a validation function
       * @param {object} req HTTP request object
       * @param {object} res HTTP response object
       * @param {function} next next middleware function
       * @returns {function} returns error message
       * @memberof AccountValidation
       */
    value: function agentChecker(req, res, next) {
      /**
       * @static  agentChecker
       * @description a validation function
       * @param {object} req HTTP request object
       * @param {object} res HTTP response object
       * @param {function} next next middleware function
       * @returns {function} returns error message
       * @memberof AccountValidation
       */
      var accountType = req.userDetails.accountType;
      accountType === 'agent' ? next() : _index["default"].errorResponse(res, 401, 'error', 'Unauthorized');
    }
  }]);
  return AccountValidation;
}();

var _default = AccountValidation;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _validationMessages = _interopRequireDefault(require("../../helper/messages/validationMessages"));

var _index = _interopRequireDefault(require("../../helper/response/index"));

var _regularExpressions = _interopRequireDefault(require("./regularExpressions"));

var DoValidation =
/*#__PURE__*/
function () {
  function DoValidation() {
    (0, _classCallCheck2["default"])(this, DoValidation);
  }

  (0, _createClass2["default"])(DoValidation, null, [{
    key: "email",
    value: function email(req, res, next) {
      var email = req.body.email; // eslint-disable-next-line prefer-destructuring

      if (!email) {
        email = req.params.email;
      }

      var validate = _regularExpressions["default"].validate();

      if (!validate.email.test(email)) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].email);
      }

      return next();
    }
  }, {
    key: "password",
    value: function password(req, res, next) {
      var password = req.body.password;

      if (!password) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].password);
      }

      return next();
    }
  }, {
    key: "userName",
    value: function userName(req, res, next) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName;

      if (!firstName) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].firstName);
      }

      if (!lastName) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].lastName);
      }

      var validate = _regularExpressions["default"].validate();

      if (!validate.userName.test(firstName.trim())) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].firstName);
      }

      if (!validate.userName.test(lastName.trim())) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].lastName);
      }

      return next();
    }
  }, {
    key: "phoneNumber",
    value: function phoneNumber(req, res, next) {
      var phoneNumber = req.body.phoneNumber;

      if (!phoneNumber) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].phoneNumber);
      }

      var validate = _regularExpressions["default"].validate();

      if (!validate.phoneNumber.test(phoneNumber.trim())) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].phoneNumber);
      }

      return next();
    }
  }, {
    key: "id",
    value: function id(req, res, next) {
      var _req$params = req.params,
          id = _req$params.id,
          propertyId = _req$params.propertyId;

      var validate = _regularExpressions["default"].validate();

      if (id) {
        if (!validate.phoneNumber.test(id)) {
          return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].Id);
        }
      }

      if (propertyId) {
        if (!validate.phoneNumber.test(propertyId)) {
          return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].Id);
        }
      }

      return next();
    }
  }, {
    key: "accountType",
    value: function accountType(req, res, next) {
      var accountType = req.body.accountType;

      var validate = _regularExpressions["default"].validate();

      if (!validate.accountType.test(accountType)) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].accountType);
      }

      return next();
    }
  }, {
    key: "price",
    value: function price(req, res, next) {
      var amount = req.body.amount;

      var validate = _regularExpressions["default"].validate();

      if (!validate.price.test(amount)) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].price);
      }

      return next();
    }
  }, {
    key: "type",
    value: function type(req, res, next) {
      var type = req.body.type;

      if (!type) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].type);
      }

      return next();
    }
  }, {
    key: "isAdmin",
    value: function isAdmin(req, res, next) {
      var isAdmin = req.body.isAdmin;

      var validate = _regularExpressions["default"].validate();

      if (!validate.isAdmin.test(isAdmin)) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].isAdmin);
      }

      return next();
    }
  }, {
    key: "address",
    value: function address(req, res, next) {
      var _req$body2 = req.body,
          city = _req$body2.city,
          state = _req$body2.state,
          address = _req$body2.address;

      if (!city) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].city);
      }

      if (!state) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].state);
      }

      if (!address) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].address);
      }

      var validate = _regularExpressions["default"].validate();

      if (!validate.address.test(city.trim())) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].city);
      }

      if (!validate.address.test(state.trim())) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].state);
      } // if (!validate.address.test(address.trim())) {
      //   return response.errorResponse(res, 400, 'error', ValidationMessages.address);
      // }


      return next();
    }
  }, {
    key: "status",
    value: function status(req, res, next) {
      var status = req.body.status;

      var validate = _regularExpressions["default"].validate();

      if (!validate.status.test(status)) {
        return _index["default"].errorResponse(res, 400, 'error', _validationMessages["default"].status);
      }

      return next();
    }
  }]);
  return DoValidation;
}();

var _default = DoValidation;
exports["default"] = _default;
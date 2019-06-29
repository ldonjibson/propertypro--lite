"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _propertyController = _interopRequireDefault(require("../../controller/propertyController"));

var _accountValidation = _interopRequireDefault(require("../../middleware/validation/accountValidation"));

var _authMiddleware = _interopRequireDefault(require("../../middleware/authMiddleware/authMiddleware"));

var _dovalidation = _interopRequireDefault(require("../../middleware/validation/dovalidation"));

var _index = _interopRequireDefault(require("../../helper/imageupload/index"));

// express libraries
// controllers
// helpers
// account routes
var propertyRoutes = (0, _express.Router)();
propertyRoutes.post('/', _authMiddleware["default"].checkIfUserIsAuthenticated, _authMiddleware["default"].checkUserById, _accountValidation["default"].agentChecker, _dovalidation["default"].type, _dovalidation["default"].address, _dovalidation["default"].price, _index["default"].uploadFile, _propertyController["default"].postProperty);
propertyRoutes.patch('/:propertyId', _dovalidation["default"].id, _authMiddleware["default"].checkIfUserIsAuthenticated, _authMiddleware["default"].checkUserById, _accountValidation["default"].agentChecker, _dovalidation["default"].type, _dovalidation["default"].address, _dovalidation["default"].price, _index["default"].uploadFile, _propertyController["default"].updateProperty);
propertyRoutes.patch('/:propertyId/sold', _dovalidation["default"].id, _authMiddleware["default"].checkIfUserIsAuthenticated, _authMiddleware["default"].checkUserById, _accountValidation["default"].agentChecker, _propertyController["default"].updateStatusProperty);
propertyRoutes["delete"]('/:propertyId', _dovalidation["default"].id, _authMiddleware["default"].checkIfUserIsAuthenticated, _authMiddleware["default"].checkUserById, _accountValidation["default"].agentChecker, _propertyController["default"].deleteProperty);
propertyRoutes.get('/', _propertyController["default"].listProperties);
propertyRoutes.get('/:propertyId', _dovalidation["default"].id, _propertyController["default"].specificPropertyDetail);
var _default = propertyRoutes;
exports["default"] = _default;
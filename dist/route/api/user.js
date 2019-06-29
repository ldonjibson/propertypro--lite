"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = _interopRequireDefault(require("../../controller/userController"));

var _dovalidation = _interopRequireDefault(require("../../middleware/validation/dovalidation"));

// exoress libraries
// controllers
// user routes
var userRoutes = (0, _express.Router)(); // signup route

userRoutes.post('/signup', _dovalidation["default"].email, _dovalidation["default"].password, _dovalidation["default"].userName, _dovalidation["default"].phoneNumber, _dovalidation["default"].accountType, _userController["default"].register); // signin route

userRoutes.post('/signin', _dovalidation["default"].email, _dovalidation["default"].password, _userController["default"].signin);
var _default = userRoutes;
exports["default"] = _default;
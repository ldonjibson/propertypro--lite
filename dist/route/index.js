"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./api/user"));

var _property = _interopRequireDefault(require("./api/property"));

var routes = (0, _express.Router)();
routes.get('/', function (req, res) {
  res.status(200).json({
    status: '200',
    message: 'Welcome to Propertypro--Lite API'
  });
});
routes.use('/auth/', _user["default"]);
routes.use('/property', _property["default"]);
var _default = routes;
exports["default"] = _default;
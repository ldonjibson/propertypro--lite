"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var ValidationMessages = function ValidationMessages() {
  (0, _classCallCheck2["default"])(this, ValidationMessages);
};

ValidationMessages.email = 'Enter a valid email.';
ValidationMessages.userName = 'Enter a valid firstName & lastName.';
ValidationMessages.password = 'Enter a password with at least 8 characters.';
ValidationMessages.firstName = 'Enter a valid firstName.';
ValidationMessages.lastName = 'Enter a valid lastName.';
ValidationMessages.phoneNumber = 'Enter a valid Phone Number';
ValidationMessages.Id = 'Invalid id, id must be a number';
ValidationMessages.accountType = 'account type can only be agent and client';
ValidationMessages.status = 'status can only be available or sold';
ValidationMessages.price = 'Enter an amount';
ValidationMessages.type = 'Enter the property type';
ValidationMessages.isAdmin = 'Indicate Administrative Post';
ValidationMessages.city = 'Enter the city where the property is located';
ValidationMessages.state = 'Enter the state where the property is located';
ValidationMessages.address = 'Enter the address of the property';
var _default = ValidationMessages;
exports["default"] = _default;
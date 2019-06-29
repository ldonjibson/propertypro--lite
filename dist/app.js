"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _index = _interopRequireDefault(require("./route/index"));

// eslint-disable-next-line no-console
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use((0, _expressFileupload["default"])({
  useTempFiles: true
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../UI')));
app.use('/api/v1/', _index["default"]);
app.get('/', function (req, res) {
  return res.sendFile('../UI/index.html');
});
app.all('*', function (req, res) {
  res.status(404).json({
    status: '404',
    message: 'Page Not Found'
  });
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("App is running on ".concat(port));
});
var _default = app;
exports["default"] = _default;
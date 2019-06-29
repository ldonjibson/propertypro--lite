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

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _index = _interopRequireDefault(require("../response/index"));

_cloudinary["default"].config({
  cloud_name: 'propertypro-lite',
  api_key: '998215369374374',
  api_secret: 'swIfDNHAjwkKU6DsuLX69gp83mQ'
});
/**
 * @class UploadingImage
 * @description class contains function for implementing Image Uploads middleware
 */


var UploadingImage =
/*#__PURE__*/
function () {
  function UploadingImage() {
    (0, _classCallCheck2["default"])(this, UploadingImage);
  }

  (0, _createClass2["default"])(UploadingImage, null, [{
    key: "uploadFile",

    /**
       * @static upload image
       * @description a middleware fucntion for uploadng images
       * @param {object} req HTTP request object
       * @param {object} res HTTP response object
       * @param {function} next next middleware function
       * @returns {object} returns error message if user is not authenticated
       */
    // eslint-disable-next-line consistent-return
    value: function () {
      var _uploadFile = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var image;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                image = req.files.image;

                if (image) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _index["default"].errorResponse(res, 409, 'error', 'Please upload an image.'));

              case 4:
                _context.next = 6;
                return _cloudinary["default"].uploader.upload(image.tempFilePath, function (results) {
                  req.body.imageUrl = results.url;
                  console.log(req.body.imageUrl);
                });

              case 6:
                return _context.abrupt("return", next());

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _index["default"].errorResponse(res, 500, 'error', 'Server error'));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function uploadFile(_x, _x2, _x3) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }]);
  return UploadingImage;
}(); // const uploadFile = async (uplaodedimage) => {
//   console.log(uplaodedimage);
//   // return image.name;
//   // image.mv(`./uploads/${image.name}`, (error, result) => {
//   //   if (error) {
//   //     return response(res, 409, 'image failed to upload');
//   //   }
//   //   return result.url;
//   // });
// };


var _default = UploadingImage;
exports["default"] = _default;
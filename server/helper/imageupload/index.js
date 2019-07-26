/* eslint-disable camelcase */
import cloudinary from 'cloudinary';
import response from '../response/index';

cloudinary.config({
  cloud_name: 'propertypro-lite',
  api_key: '998215369374374',
  api_secret: 'swIfDNHAjwkKU6DsuLX69gp83mQ',
});

/**
 * @class UploadingImage
 * @description class contains function for implementing Image Uploads middleware
 */
class UploadingImage {
  /**
     * @static upload image
     * @description a middleware fucntion for uploadng images
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {object} returns error message if user is not authenticated
     */
  static async uploadFile(req, res, next) {
    let resultingimageurl;
    const {
      files: { image },
      body: { image_url },
    } = req;
    try {
      if (!image && !image_url) {
        return response.errorResponse(res, 409, 'error', 'Please upload an image.');
      }
      if (image) {
        await cloudinary.uploader.upload(image.tempFilePath, (results) => {
          resultingimageurl = results.url;
        });
      }
      if (image_url) {
        resultingimageurl = image_url;
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    req.body.image_url = resultingimageurl;
    return next();
  }
}
export default UploadingImage;

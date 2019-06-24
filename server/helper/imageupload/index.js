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
  // eslint-disable-next-line consistent-return
  static async uploadFile(req, res, next) {
    try {
      const { image } = req.files;
      if (!image) {
        return response.errorResponse(res, 409, 'error', 'Please upload an image.');
      }
      await cloudinary.uploader.upload(image.tempFilePath, (results) => {
        req.body.imageUrl = results.url;
      });
    } catch (error) {
      return response.errorResponse(res, 409, 'error', 'error uploading image');
    }
    return next();
  }
}


// const uploadFile = async (uplaodedimage) => {
//   console.log(uplaodedimage);
//   // return image.name;
//   // image.mv(`./uploads/${image.name}`, (error, result) => {
//   //   if (error) {
//   //     return response(res, 409, 'image failed to upload');
//   //   }
//   //   return result.url;
//   // });
// };

export default UploadingImage;

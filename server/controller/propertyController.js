/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

import response from '../helper/response/index';
import properties from '../model/property';

/**
    * @class PropertyController
    * @description Allow a user to post a property
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    */
// class PropertyController {
class PropertyController {
  /**
    * @static postProperty
    * @description Allow a user to create bank account
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async postProperty(req, res) {
    const {
      body: { type, state, city, address, amount, imageUrl },
      userDetails: { id: userid },
    } = req;
    const price = await parseFloat(amount).toFixed(2);
    try {
      const [id, created_on, status, owner, image_url] = [properties.length + 1, Date.now(), 'available', userid, imageUrl];
      const newProperty = { id, owner, status, type, state, city, address, price, created_on, image_url };
      newProperty.address = address.trim();
      properties.push(newProperty);
      return response.successResponse(res, 201, 'success', newProperty);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }
}
export default PropertyController;

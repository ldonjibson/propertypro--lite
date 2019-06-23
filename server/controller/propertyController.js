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
      body: { status, type, state, city, address, price, imageUrl },
      userDetails: { id: userid },
    } = req;
    try {
      const [id, created_on, owner, image_url] = [properties.length + 1, Date.now(), userid, imageUrl];
      const newProperty = { id, owner, status, type, state, city, address, price, created_on, image_url };
      newProperty.address = address.trim();
      properties.push(newProperty);
      return response(res, 201, 'Successfully posted a new property', newProperty)      
    } catch (error) {
      return response(res, 500, 'Server error');
    }
  }

}
export default PropertyController;

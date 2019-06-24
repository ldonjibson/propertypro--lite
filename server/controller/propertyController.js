/* eslint-disable radix */
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
    * @description Allow a user to Create Property
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

  /**
    * @static updateProperty
    * @description Allow a user to Update Property
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async updateProperty(req, res) {
    const {
      body: { type, state, city, address, price, imageUrl },
      userDetails: { id: userid },
      params: { propertyId },
    } = req;
    try {
      let getProperty = await properties.find(property => property.id === parseInt(propertyId) && property.owner === parseInt(userid));
      if (!getProperty) {
        return response(res, 401, 'You are not authorized to edit this property')      
      }
      getProperty.address = address.trim();
      const [id, status, owner] = [propertyId, getProperty.status, userid ];
      getProperty = { id, owner, status, type, city, state, address, price, imageUrl };
      return response(res, 201, 'Successfully updated property', getProperty)      
    } catch (error) {
      return response(res, 500, 'Server error');
    }
  }
}
export default PropertyController;

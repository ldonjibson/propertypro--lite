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
        return response.errorResponse(res, 401, 'error', 'You are not authorized to edit this property')
      }
      getProperty.address = address.trim();
      const [id, status, owner] = [propertyId, getProperty.status, userid];
      getProperty = { id, owner, status, type, city, state, address, price, imageUrl };
      return response.successResponse(res, 201, 'success', getProperty);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }

  /**
    * @static updateStatusProperty
    * @description Allow a user to Update StatusProperty
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async updateStatusProperty(req, res) {
    const {
      userDetails: { id: userid },
      params: { propertyId },
    } = req;
    try {
      const getProperty = await properties.find(property => property.id === parseInt(propertyId) && property.owner === parseInt(userid));
      if (!getProperty) {
        return response.errorResponse(res, 401, 'error', 'You are not authorized to edit this property');
      }
      getProperty.status = 'sold';
      return response.successResponse(res, 201, 'success', getProperty);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }

  /**
    * @static deleteProperty
    * @description Allow a agent to delete Property
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async deleteProperty(req, res) {
    const {
      userDetails: { id: userid },
      params: { propertyId },
    } = req;
    try {
      const getProperty = await properties.find(property => property.id === parseInt(propertyId) && property.owner === parseInt(userid));
      if (!getProperty) {
        return response.errorResponse(res, 401, 'error', 'You are not authorized to delete this property');
      }
      properties.splice([parseInt(propertyId) - 1], 1);
      return response.successResponse(res, 200, 'success', { message: 'Property deleted successfully.'});
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }
}
export default PropertyController;

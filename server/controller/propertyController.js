/* eslint-disable radix */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

import response from '../helper/response/index';
import properties from '../model/property';
import users from '../model/users';

/**
    * @class PropertyController
    * @description Allow a user to post a property
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    */
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
      return response.successResponse(res, 201, 'success', newProperty)
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

  // /**
  //   * @static updateStatusProperty
  //   * @description Allow a user to Update StatusProperty
  //   * @param {object} req - Request object
  //   * @param {object} res - Response object
  //   * @returns {object} Json
  //   * @memberof PropertyController
  //   */
  // static async updateStatusProperty(req, res) {
  //   const {
  //     userDetails: { id: userid },
  //     params: { propertyId },
  //   } = req;
  //   try {
  //     const getProperty = await properties.find(property => property.id === parseInt(propertyId) && property.owner === parseInt(userid));
  //     if (!getProperty) {
  //       return response.errorResponse(res, 401, 'error', 'You are not authorized to edit this property');
  //     }
  //     getProperty.status = 'sold';
  //     return response.successResponse(res, 201, 'success', getProperty);
  //   } catch (error) {
  //     return response.errorResponse(res, 500, 'error', 'Server error');
  //   }
  // }

  // /**
  //   * @static deleteProperty
  //   * @description Allow a agent to delete Property
  //   * @param {object} req - Request object
  //   * @param {object} res - Response object
  //   * @returns {object} Json
  //   * @memberof PropertyController
  //   */
  // static async deleteProperty(req, res) {
  //   const {
  //     userDetails: { id: userid },
  //     params: { propertyId },
  //   } = req;
  //   try {
  //     const getProperty = await properties.find(property => property.id === parseInt(propertyId) && property.owner === parseInt(userid));
  //     if (!getProperty) {
  //       return response.errorResponse(res, 401, 'error', 'You are not authorized to delete this property');
  //     }
  //     delete properties[parseInt(propertyId) - 1];
  //     return response.successResponse(res, 200, 'success', { message: 'Property deleted successfully.'});
  //   } catch (error) {
  //     return response.errorResponse(res, 500, 'error', 'Server error');
  //   }
  // }

  // /**
  //   * @static listProperties
  //   * @description Allow a user to view all Properties and specific type properties
  //   * @param {object} req - Request object
  //   * @param {object} res - Response object
  //   * @returns {object} Json
  //   * @memberof PropertyController
  //   */
  // static async listProperties(req, res) {
  //   const { type } = req.query;
  //   try {
  //     if (type) {
  //       const getTypeProperties = await properties.filter(property => property.type === type);
  //       const listTypeProperties = await getTypeProperties.map((property) => {
  //         const getPropertyOwner = users.find(user => user.id === property.owner);
  //         [property.ownerEmail, property.ownerPhoneNumber] = [getPropertyOwner.email , getPropertyOwner.phoneNumber];
  //         return property;
  //       });
  //       if (listTypeProperties.length === 0) {
  //         return response.errorResponse(res, 404, 'error', 'No property was found');
  //       }
  //       return response.successResponse(res, 200, 'success', listTypeProperties);
  //     }
  //     const allProperties = await properties.map((property) => {
  //       const getPropertyOwner = users.find(user => user.id === property.owner);
  //       [property.ownerEmail, property.ownerPhoneNumber] = [getPropertyOwner.email , getPropertyOwner.phoneNumber];
  //       return property;
  //     });
  //     return response.successResponse(res, 200, 'success', allProperties);
  //   } catch (error) {
  //     return response.errorResponse(res, 500, 'error', 'Server error');
  //   }
  // }

  // /**
  //   * @static specificPropertyDetail
  //   * @description Allow a user to view details of a specific Properties
  //   * @param {object} req - Request object
  //   * @param {object} res - Response object
  //   * @returns {object} Json
  //   * @memberof PropertyController
  //   */
  // static async specificPropertyDetail(req, res) {
  //   const { propertyId } = req.params;
  //   try {
  //     const detailProperty = await properties.find(property => property.id === parseInt(propertyId));
  //     const getPropertyOwner = await users.find(user => user.id === detailProperty.owner);
  //     [detailProperty.ownerEmail, detailProperty.ownerPhoneNumber] = [getPropertyOwner.email , getPropertyOwner.phoneNumber];
  //     return response.successResponse(res, 200, 'success', detailProperty);
  //   } catch (error) {
  //     return response.errorResponse(res, 500, 'error', 'Server error');
  //   }
  // }
}
export default PropertyController;

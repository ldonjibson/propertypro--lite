/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

import response from '../helper/response/index';
import properties from '../model/property';
import users from '../model/users';
import pool from '../db/config';

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
      userDetails: { id: userId },
    } = req;
    const price = await parseFloat(amount).toFixed(2);
    let newProperty;
    try {
      // const newProperties = { owner: userid, status: '\'available\'', type, state, city, address: address.trim(), price, imageurl: imageUrl };
      newProperty = await pool.query(`insert into properties (owner, status, type, state, city, address, price, imageurl) 
      values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`, [
        userId, '\'available\'', type, state, city, address.trim(), price, imageUrl]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id, createdon } = newProperty.rows[0];
    return response.successResponse(res, 201, 'success', {
      id, owner: userId, status: '\'available\'', type, state, city, address: address.trim(), price, image_url: imageUrl, created_on: createdon });    
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
      body: { type, state, city, address, amount, imageUrl },
      userDetails: { id: userid },
      params: { propertyId },
    } = req;
    const price = parseFloat(amount).toFixed(2);
    let updateProperty;
    try {
      updateProperty = await pool.query(`update properties set type=$1, state=$2, city=$3, address=$4, price=$5, imageurl=$6 
      where id = $7 returning *;`,
      [type, state, city, address.trim(), price, imageUrl, parseInt(propertyId)]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id, status, createdon } = updateProperty.rows[0];
    return response.successResponse(res, 201, 'success', {
      id, owner: userid, status, type, state, city, address: address.trim(), price, image_url: imageUrl, created_on: createdon });
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
      userDetails: { id: userId },
      params: { propertyId },
    } = req;
    let updateProperty;
    try {
      updateProperty = await pool.query('update properties set status=$1 where id = $2 returning *;',
        ['sold', parseInt(propertyId)]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { status, state, city, address, imageurl, createdon } = updateProperty.rows[0];
    return response.successResponse(res, 201, 'success', {
      id: propertyId, owner: userId, status, state, city, address, created_on: createdon, image_url: imageurl,
    });
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
    const { propertyId } = req.params;
    try {
      await pool.query('delete from properties where id = $1', [propertyId]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    return response.successResponse(res, 200, 'success', { message: 'Property deleted successfully.'});
  }

  /**
    * @static listProperties
    * @description Allow a user to view all Properties and specific type properties
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async listProperties(req, res) {
    const { type } = req.query;
    try {
      let getTypeProperties;
      if (type) {
        getTypeProperties = await pool.query('SELECT * FROM properties INNER JOIN users on properties.owner = users.id WHERE type = $1', [type]);
      }
      if (getTypeProperties.rowCount === 0) {
        return response.errorResponse(res, 404, 'error', 'No property was found');
      }
      const {id, owner, status, city, state, address, price, createdon, imageurl, firstname, lastname, email, phonenumber, accounttype } = getTypeProperties.rows[0]
      return response.successResponse(res, 200, 200, {
        id, owner, status, city, state, address, price: parseFloat(price).toFixed(2), created_on: createdon, image_url: imageurl, first_name: firstname, last_name: lastname, email, phone_number: phonenumber, account_type: accounttype,
      });
      // }
      // const allProperties = await properties.map((property) => {
      //   const getPropertyOwner = users.find(user => user.id === property.owner);
      //   [property.ownerEmail, property.ownerPhoneNumber] = [getPropertyOwner.email, getPropertyOwner.phoneNumber];
      //   return property;
      // });
      // return response.successResponse(res, 200, 200, allProperties);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }

  /**
    * @static specificPropertyDetail
    * @description Allow a user to view details of a specific Properties
    * @param {object} req - Request object
    * @param {object} res - Response object
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async specificPropertyDetail(req, res) {
    const { propertyId } = req.params;
    try {
      const detailProperty = await properties.find(property => property.id === parseInt(propertyId));
      const getPropertyOwner = await users.find(user => user.id === detailProperty.owner);
      [detailProperty.ownerEmail, detailProperty.ownerPhoneNumber] = [getPropertyOwner.email , getPropertyOwner.phoneNumber];
      return response.successResponse(res, 200, 200, detailProperty);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
  }
}
export default PropertyController;

/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable object-property-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

import response from '../helper/response/index';
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
    console.log(req);
    let {
      body: { type, state, city, address, price, image_url },
      userDetails: { id: userId },
    } = req;
    price = await parseFloat(price).toFixed(2);
    let newProperty;
    try {
      newProperty = await pool.query(`insert into properties (owner, status, type, state, city, address, price, imageurl) 
      values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`, [
        userId, '\'available\'', type, state, city, address.trim(), price, image_url]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id, createdon } = newProperty.rows[0];
    return response.successResponse(res, 201, 'success', {
      id, owner: userId, status: '\'available\'', type, state, city,
      address: address.trim(), price, image_url, created_on: createdon });
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
    let {
      body: { price },
      userDetails: { id: userid },
      params: { propertyId },
    } = req;
    price = parseFloat(price).toFixed(2);
    let updateProperty;
    try {
      updateProperty = await pool.query(`update properties set price=$1, 
      where id = $2 returning *;`,
      [price, parseInt(propertyId)]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id, type, state, city, address, status, imageurl, createdon } = updateProperty.rows[0];
    return response.successResponse(res, 201, 'success', {
      id, owner: userid, status, type, state, city, address,
      price, image_url: imageurl, created_on: createdon });
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
      let getProperties;
      if (type) {
        getProperties = await pool.query(`SELECT properties.id pid, * FROM properties INNER JOIN users 
        on properties.owner = users.id WHERE properties.type = $1 ORDER BY properties.id;`, [type]);
        if (getProperties.rowCount === 0) {
          return response.errorResponse(res, 404, 'error', 'No property was found');
        }
      } else {
        getProperties = await pool.query(`SELECT properties.id pid, * FROM properties INNER JOIN 
        users on properties.owner = users.id ORDER BY properties.id;`);
      }
      const data = getProperties.rows.map((property) => {
        const { pid, owner, status, city, state, address, price, createdon, imageurl,
          firstname, lastname, email, phonenumber, accounttype } = property;
        return { id: pid, owner, type, status, city, state, address, price: parseFloat(price).toFixed(2),
          created_on: createdon, image_url: imageurl, first_name: firstname, last_name: lastname, email,
          phone_number: phonenumber, account_type: accounttype };
      });
      return response.successResponse(res, 200, 'success', data);
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
    let detailProperty;
    try {
      detailProperty = await pool.query(`SELECT properties.id pid, * FROM properties INNER JOIN users on 
      properties.owner = users.id WHERE properties.id = $1`, [parseInt(propertyId)]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { pid, type, owner, status, city, state, address, price, createdon,
      imageurl, firstname, lastname, email, phonenumber, accounttype } = detailProperty.rows[0];
    return response.successResponse(res, 200, 'success', {
      id: pid, owner, type, status, city, state, address, price: parseFloat(price).toFixed(2),
      created_on: createdon, image_url: imageurl, first_name: firstname, last_name: lastname,
      email, phone_number: phonenumber, account_type: accounttype,
    });
  }
}
export default PropertyController;

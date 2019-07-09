/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import response from '../../helper/response/index';
import pool from '../../db/config';
/**
     * @class PropertytValidation
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     */
class PropertytValidation {
  /**
     * @static  propertyOwnerChecker
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof PropertytValidation
     */

  static async propertyOwnerChecker(req, res, next) {
    /**
     * @static  agentChecker
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof PropertytValidation
     */
    const { propertyId } = req.params;
    const userId = req.userDetails.id;
    try {
      const getProperty = await pool.query(`SELECT id, owner 
      FROM properties WHERE id=$1 AND owner=$2 ORDER BY id DESC LIMIT 1;`, [propertyId, userId]);
      if (getProperty.rowCount === 0) {
        return response.errorResponse(res, 401, 'error', 'You are not authorized to edit this property');
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    return next();
  }
}
export default PropertytValidation;

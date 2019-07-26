/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import response from '../../helper/response/index';
import RegularExpression from './regularExpressions';

/**
     * @class AccountValidation
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     */
class AccountValidation {
  /**
     * @static  checkIfAccountExist
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */

  static agentChecker(req, res, next) {
    /**
     * @static  agentChecker
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */
    const { accounttype } = req.userDetails;
    (accounttype === 'agent') ? next() : response.errorResponse(res, 401, 'error', 'Unauthorized, you must be an agent');
  }
}
export default AccountValidation;

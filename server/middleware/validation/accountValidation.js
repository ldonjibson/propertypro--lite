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
  static async checkIfAccountExist(req, res, next) {
    const { accountNumber } = req.params;
    try {
      const { rows } = await pool.query('select * from accounts where accountnumber = $1', [Number(accountNumber)]);
      if (!rows[0]) {
        return response(res, 404, 'Account Not Found');
      }
      req.accountDetails = rows[0];
      return next();
    } catch (error) {
      return response(res, 404, 'Account Not Found');
    }
  }

  static agentChecker(req, res, next) {
    /**
     * @static  staffChecker
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */
    const { accountType } = req.userDetails;
    (accountType === 'agent') ? next() : response(res, 401, 'Unauthorized');
  }

  static adminChecker(req, res, next) {
    /**
     * @static  adminChecker
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */
    const { isadmin } = req.userDetails;
    isadmin === 'true' ? next() : response(res, 401, 'Unauthorized');
  }

  static strictlyStaff(req, res, next) {
    /**
     * @static  strictlyStaff
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */
    const { isadmin, type } = req.userDetails;
    if (isadmin === 'true' || type === 'client') {
      return response(res, 401, 'Unauthorized');
    }
    return next();
  }

  static async accountType(req, res, next) {
    /**
     * @static  type
     * @description a validation function
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {function} returns error message
     * @memberof AccountValidation
     */
    const { accountType } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.accountType.test(accountType)) {
      return response(res, 400, 'Choose a valid account type');
    }
    return next();
  }
}


export default AccountValidation;

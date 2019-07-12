/* eslint-disable object-property-newline */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
// eslint-disable-next-line dot-notation
import response from '../helper/response/index';
import sendMail from '../helper/sendMail/index';
import TokenManager from '../helper/tokenManager';
import PasswordManager from '../helper/passwordManager';
import pool from '../db/config';
/**
   * @class UserController
   * @description UserController
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   */
class UserController {
  /**
   * @static register
   * @description Allow a user to signup
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof UserControllers
   */
  static async register(req, res) {
    let { firstName, lastName, email, password, phoneNumber, accountType, address } = req.body;
    let newUser;
    try {
      const hashPassword = await PasswordManager.hashPassword(password);
      const userDetails = await pool.query('select * from users where email = $1', [email]);
      if (userDetails.rows[0]) {
        return response.errorResponse(res, 409, 'error', 'Email already in use');
      }
      newUser = await pool.query(`insert into users (firstname, lastname, email,
      password, phonenumber, accounttype, address, isadmin) values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id`, [firstName, lastName, email, hashPassword, phoneNumber, accountType, 
        address, 'false']);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id } = newUser.rows[0];
    const token = TokenManager.sign({ id, accountType, isAdmin: false });
    return response.successResponse(res, 201, 'success', {
      token, id, first_name: firstName, last_name: lastName, email,
      phone_number: phoneNumber, account_type: accountType, address, is_admin: false,
    });
  }

  /**
   * @static signin
   * @description Allows a user to sign in
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof UserControllers
   */
  static async signin(req, res) {
    const { email, password } = req.body;
    let userDetails;
    let isPasswordValid;
    try {
      userDetails = await pool.query('select * from users where email = $1', [email]);
      if (!userDetails.rows[0]) {
        return response.errorResponse(res, 404, 'error', 'User does not exist');
      }
      isPasswordValid = PasswordManager.verifyPassword(password, userDetails.rows[0].password);
      if (isPasswordValid === false) {
        return response.errorResponse(res, 400, 'error', 'Incorrect Password or Email');
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    const { id, firstname, lastname, accounttype, isadmin, address } = userDetails.rows[0];
    let token;
    if (isPasswordValid) {
      token = TokenManager.sign({ id, accounttype, isadmin });
    }
    return response.successResponse(res, 200, 'success', {
      token, id, first_name: firstname, last_name: lastname,
      email, account_type: accounttype, address, is_admin: isadmin,
    });
  }

  /**
   * @static passwordreset
   * @description Allows a user to resetpassword
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} Json
   * @memberof UserControllers
   */
  static async passwordReset(req, res) {
    const { password, newPassword } = req.body;
    const { email } = req.params;
    let changedPassword;
    let userDetails;
    try {
      userDetails = await pool.query('select * from users where email = $1', [email]);
      if (!userDetails.rows[0]) {
        return response.errorResponse(res, 404, 'error', 'User does not exist');
      }
      if (password && newPassword) {
        // eslint-disable-next-line max-len
        const isPasswordValid = PasswordManager.verifyPassword(password, userDetails.rows[0].password);
        if (isPasswordValid === false) {
          return response.errorResponse(res, 400, 'error', 'Incorrect Password');
        }
        changedPassword = newPassword;
      } else {
        changedPassword = `xX9x${userDetails.rows[0].firstname}x3rw`;
        sendMail.passwordReset(changedPassword, email);
      }
      const hashPassword = await PasswordManager.hashPassword(changedPassword);
      await pool.query('update users set password = $1 where email = $2;', [hashPassword, email]);
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    return response.successResponse(res, 204, 204);
  }
}

export default UserController;

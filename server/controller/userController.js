/* eslint-disable prefer-const */
// eslint-disable-next-line dot-notation
import response from '../helper/response/index';
import PasswordManager from '../helper/passwordManager';
import users from '../model/users';
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
      const userDetails = await users.find(user => user.email === email);
      if (userDetails) {
        return response(res, 409, 'Email already in use');
      }
      let id; let isAdmin; let createdOn; let token;
      [token, id, isAdmin, createdOn, password] = [`45erkjherht4549${Math.floor(Math.random() * 10000)}`, users.length + 1, false, Date.now(), hashPassword ];
      newUser = { token, id, firstName, lastName, email, password, phoneNumber, address, accountType, isAdmin, createdOn}     
      users.push(newUser);
    } catch (error) {
      return response(res, 500, 'Server error');
    }
    return response(res, 201, 'Successfully created a new user account', newUser);
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
      userDetails = await users.find(user => user.email === email);
      if (!userDetails) {
        return response(res, 400, 'User doesn\'t exist');
      }
      isPasswordValid = PasswordManager.verifyPassword(password, userDetails.password);
      if (!isPasswordValid) {
        return response(res, 400, 'Incorrect Password or Email');
      }
    } catch (error) {
      return response(res, 500, 'Server error');
    }
    delete userDetails.password;
    if (isPasswordValid) {
      return response(res, 200, 'Successfully signed in', userDetails);
    }
    return response(res, 400, 'Invalid Password or Email');
  }
}

export default UserController;
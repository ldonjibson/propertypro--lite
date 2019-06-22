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
      const userDetails = users.find(user => user.email === email);
      if (userDetails) {
        return response(res, 409, 'Email already in use');
      }
      let id; let isAdmin; let createdOn;
      [id, isAdmin, createdOn, password] = [users.length + 1, false, Date.now(), hashPassword ];
      newUser = { id, firstName, lastName, email, password, phoneNumber, address, accountType, isAdmin, createdOn}     
      users.push(newUser)
    } catch (error) {
      return response(res, 500, 'Server error');
    }
    return response(res, 201, 'Successfully created a new user account', newUser);
  }
}

export default UserController;

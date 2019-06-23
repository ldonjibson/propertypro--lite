/* eslint-disable prefer-destructuring */
import response from '../../helper/response/index';
import users from '../../model/users';
/**
 * @class AuthMiddleware
 * @description class contains function for implementing Authentication middleware
 */
class AuthMiddleware {
  /**
     * @static checkIfUserIsAuthenticated
     * @description a middleware function checking if a user is authenticated
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {object} returns error message if user is not authenticated
     */
  // eslint-disable-next-line consistent-return
  static async checkIfUserIsAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers || req.params || req.body;
      if (!authorization) {
        return response(res, 401, 'You are not signed in.');
      }
      const token = authorization;
      const decoded = await users.find(user => user.token === token);
      if (decoded) {
        req.userDetails = decoded;
        return next();
      }
    } catch (error) {
      return response(res, 401, 'You are not signed in.');
    }
    return response(res, 500, 'An error occured on the server');
  }


  static async checkUserById(req, res, next) {
    /**
     * @static checkUserById
     * @description a middleware function checking if a user is authenticated
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     * @returns {object} returns error message if user is not authenticated
     */
    try {
      const userDetails = await users.find(user => user.id === req.userDetails.id);
      if (!userDetails) {
        return response(res, 404, 'User account not found');
      }
    } catch (error) {
      return response(res, 500, 'Server error');
    }
    return next();
  }
}

export default AuthMiddleware;

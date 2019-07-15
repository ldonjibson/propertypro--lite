/* eslint-disable prefer-destructuring */
import response from '../../helper/response/index';
import TokenManager from '../../helper/tokenManager/index';

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
        return response.errorResponse(res, 401, 'error', 'You are not signed in.');
      }
      let token = authorization;
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      const decoded = await TokenManager.verify(token);
      if (!decoded) {
        return response.errorResponse(res, 401, 'error', 'You are not signed in.');
      }
      req.userDetails = decoded;
    } catch (error) {
      return response.errorResponse(res, 500, 'error', 'Server error');
    }
    return next();
  }
}

export default AuthMiddleware;

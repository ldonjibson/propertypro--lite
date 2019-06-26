/**
 *
 * @description Method to send response in a generic format.
 * @param {*} res Express Response object
 * @param {number} status '200' || '400'
 * @param {string} message Message to user
 * @param {object} error (optional) Error object
 * @param {object} payload (optional) Payload data to return with the response
 * @returns {object} Json response
 */

class response {
  /**
    * @static postProperty
    * @description Allow a user to Create Property
    * @param {object} res - Response object
    * @param {number} code response code
    * @param {object} payload response code
    * @returns {object} Json
    * @memberof PropertyController
    */
  static async successResponse(res, code, message, payload) {
    res.status(code).json({
      status: message,
      data: payload,
    });
  }

  static async errorResponse(res, code, message, payload) {
    res.status(code).json({
      status: message,
      error: payload,
    });
  }

}

export default response;

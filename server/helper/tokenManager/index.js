import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const myjwtsecret = process.env.JWT_SECRET;

/**
 *
 *
 * @class TokenManager
 */
class TokenManager {
  /**
     *
     * @description Encodes a passed token and returns a jwt token
     * @static
     * @param {*} payload
     * @param {string} [ttl='60 days']
     * @returns {string} Jwt token
     * @memberof TokenManager
     */
  static sign(payload, expTime = '60d') {
    return jwt.sign(payload, myjwtsecret, { expiresIn: expTime });
  }

  /**
     *
     * @description Verifies a passed token and returns a decoded payload
     * @static
     * @param {string} token
     * @returns {object} Payload
     * @memberof TokenManager
     */
  static verify(token) {
    const payload = jwt.verify(token, myjwtsecret, (err, decoded) => decoded);
    delete payload.password;
    return payload;
  }
}

export default TokenManager;

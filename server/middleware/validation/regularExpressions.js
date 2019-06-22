
class RegularExpression {
  /**
 * @class
 * @RegularExpression This class contains regular expression for the app.
 */
  static validate() {
    return {
      // eslint-disable-next-line no-useless-escape
      email: /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
      phoneNumber: /^[0-9]*$/,
      userName: /^[a-zA-Z]{3,25}$/,
      password: /[a-zA-Z0-9]{8,}/,
      accountType: /(client|agent)$/i,
      isAdmin: /(true|false)$/i,
    };
  }
}
export default RegularExpression;

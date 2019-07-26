
class RegularExpression {
  /**
 * @class
 * @RegularExpression This class contains regular expression for the app.
 */
  static validate() {
    return {
      email: /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
      phoneNumber: /^[0-9]*$/,
      userName: /^[a-zA-Z]{3,25}$/,
      password: /[a-zA-Z0-9]{8,}/,
      accountType: /(client|agent)$/i,
      status: /(available|sold)$/i,
      isAdmin: /(true|false)$/i,
      price: /^[0-9]+.([0-9])+$/,
      address: /^[a-zA-Z0-9_][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$/,
    };
  }
}
export default RegularExpression;

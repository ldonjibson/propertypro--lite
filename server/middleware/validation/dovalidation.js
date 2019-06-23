import ValidationMessages from '../../helper/messages/validationMessages';
import response from '../../helper/response/index';
import RegularExpression from './regularExpressions';


class DoValidation {
  static email(req, res, next) {
    let { email } = req.body;
    // eslint-disable-next-line prefer-destructuring
    if (!email) { email = req.params.email; }
    const validate = RegularExpression.validate();
    if (!validate.email.test(email)) {
      return response(res, 400, ValidationMessages.email);
    }
    return next();
  }

  static password(req, res, next) {
    const { password } = req.body;
    if (!password) {
      return response(res, 400, ValidationMessages.password);
    }
    return next();
  }

  static userName(req, res, next) {
    const { firstName, lastName } = req.body;
    if (!firstName) {
      return response(res, 400, ValidationMessages.firstName);
    }
    if (!lastName) {
      return response(res, 400, ValidationMessages.lastName);
    }
    const validate = RegularExpression.validate();
    if (!validate.userName.test(firstName.trim())) {
      return response(res, 400, ValidationMessages.firstName);
    }
    if (!validate.userName.test(lastName.trim())) {
      return response(res, 400, ValidationMessages.lastName);
    }
    return next();
  }

  static phoneNumber(req, res, next) {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return response(res, 400, ValidationMessages.phoneNumber);
    }
    const validate = RegularExpression.validate();
    if (!validate.phoneNumber.test(phoneNumber.trim())) {
      return response(res, 400, ValidationMessages.phoneNumber);
    }
    return next();
  }

  static id(req, res, next) {
    const { id } = req.params;
    const validate = RegularExpression.validate();
    if (!validate.accountNumber.test(id)) {
      return response(res, 400, ValidationMessages.id);
    }
    return next();
  }

  static accountType(req, res, next) {
    const { accountType } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.accountType.test(accountType)) {
      return response(res, 400, ValidationMessages.accountType);
    }
    return next();
  }

  static isAdmin(req, res, next) {
    const { isAdmin } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.isAdmin.test(isAdmin)) {
      return response(res, 400, ValidationMessages.isAdmin);
    }
    return next();
  }

  static address(req, res, next) {
    const { city, state, address } = req.body;
    if (!city) { return response(res, 400, ValidationMessages.city); }
    if (!state) { return response(res, 400, ValidationMessages.state); }
    if (!address) { return response(res, 400, ValidationMessages.address); }
    const validate = RegularExpression.validate();
    if (!validate.address.test(city.trim())) {
      return response(res, 400, ValidationMessages.city);
    }
    if (!validate.address.test(state.trim())) {
      return response(res, 400, ValidationMessages.state);
    }
    // if (!validate.address.test(address.trim())) {
    //   return response(res, 400, ValidationMessages.address);
    // }
    return next();
  }
}

export default DoValidation;

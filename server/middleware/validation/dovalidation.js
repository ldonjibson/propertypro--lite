/* eslint-disable camelcase */
import ValidationMessages from '../../helper/messages/validationMessages';
import response from '../../helper/response/index';
import RegularExpression from './regularExpressions';


class DoValidation {
  static email(req, res, next) {
    let { email } = req.body;
    const validate = RegularExpression.validate();
    if (!email) { email = req.params.email; }
    if (!validate.email.test(email)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.email);
    }
    return next();
  }

  static password(req, res, next) {
    const { password } = req.body;
    if (!password) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.password);
    }
    return next();
  }

  static userName(req, res, next) {
    const { first_name, last_name } = req.body;
    if (!first_name) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.firstName);
    }
    if (!last_name) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.lastName);
    }
    const validate = RegularExpression.validate();
    if (!validate.userName.test(first_name.trim())) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.firstName);
    }
    if (!validate.userName.test(last_name.trim())) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.lastName);
    }
    return next();
  }

  static phoneNumber(req, res, next) {
    const { phone_number } = req.body;
    if (!phone_number) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.phoneNumber);
    }
    const validate = RegularExpression.validate();
    if (!validate.phoneNumber.test(phone_number.trim())) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.phoneNumber);
    }
    return next();
  }

  static id(req, res, next) {
    let { id } = req.params;
    const validate = RegularExpression.validate();
    if (!id) { id = req.params.propertyId; }
    if (!validate.phoneNumber.test(id)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.Id);
    }
    return next();
  }

  static accountType(req, res, next) {
    const { accountType } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.accountType.test(accountType)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.accountType);
    }
    return next();
  }

  static price(req, res, next) {
    const { price } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.price.test(price)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.price);
    }
    return next();
  }

  static type(req, res, next) {
    const { type } = req.body;
    if (!type) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.type);
    }
    return next();
  }

  static isAdmin(req, res, next) {
    const { is_admin } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.isAdmin.test(is_admin)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.isAdmin);
    }
    return next();
  }

  static address(req, res, next) {
    const { city, state, address } = req.body;
    if (!city) { return response.errorResponse(res, 400, 'error', ValidationMessages.city); }
    if (!state) { return response.errorResponse(res, 400, 'error', ValidationMessages.state); }
    if (!address) { return response.errorResponse(res, 400, 'error', ValidationMessages.address); }
    const validate = RegularExpression.validate();
    if (!validate.address.test(city.trim())) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.city);
    }
    if (!validate.address.test(state.trim())) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.state);
    }
    return next();
  }

  static useraddress(req, res, next) {
    const { address } = req.body;
    if (!address) { return response.errorResponse(res, 400, 'error', ValidationMessages.address); }
    return next();
  }

  static status(req, res, next) {
    const { status } = req.body;
    const validate = RegularExpression.validate();
    if (!validate.status.test(status)) {
      return response.errorResponse(res, 400, 'error', ValidationMessages.status);
    }
    return next();
  }
}

export default DoValidation;

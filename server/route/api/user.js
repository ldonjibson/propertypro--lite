// exoress libraries
import { Router } from 'express';

// controllers
import UserController from '../../controller/userController';
import DoValidation from '../../middleware/validation/dovalidation';


// user routes
const userRoutes = Router();

// signup route
userRoutes.post(
  '/signup',
  DoValidation.email,
  DoValidation.password,
  DoValidation.userName,
  DoValidation.phoneNumber,
  DoValidation.useraddress,
  UserController.register,
);

// signin route
userRoutes.post(
  '/signin',
  DoValidation.email,
  DoValidation.password,
  UserController.signin,
);

// password reset route
userRoutes.post(
  '/:email/reset_password',
  DoValidation.email,
  UserController.passwordReset,
);

export default userRoutes;

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
  DoValidation.accountType,
  UserController.register,
);

// signin route
userRoutes.post(
  '/signin',
  DoValidation.email,
  DoValidation.password,
  UserController.signin,
);

export default userRoutes;
